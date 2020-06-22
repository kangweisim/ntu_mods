import { colors, Divider, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ErrorMessage, GenericHeader, LoadingIndicator, Page } from "app/components";
import { API } from "app/services";
import { ModelsActions } from "app/store/actions";
import { useErrorCatcher } from "app/utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Summary, Topics } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

let mounted = false;
const ModuleDetail = props => {
  const classes = useStyles();

  const { match, history } = props;
  const { moduleId, tab } = match.params;

  const dispatch = useDispatch();
  const model = useSelector(state => state.models.module);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const runAsyncBlock = useErrorCatcher(error => setErrorMessage(error && error.message));

  const update = () => {
    setLoading(true);
    dispatch(ModelsActions.update_model({ module: null }));
    runAsyncBlock(async () => {
      const { model } = await API.Module.detail(moduleId);
      if (mounted) {
        dispatch(ModelsActions.update_model({ module: model }));
      }
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    mounted = true;

    update();

    return () => mounted = false;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    mounted = true;

    update();

    return () => mounted = false;
    // eslint-disable-next-line
  }, [moduleId]);

  const handleTabsChange = (event, value) => {
    history.push(value);
  };


  const tabs = [
    { value: "summary", label: "Summary" },
    { value: "topics", label: "Topics" },
  ];

  if (!tab) {
    return <Redirect to={`/modules/${moduleId}/summary`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  return (
    <Page className={classes.root} title="Modules" >
      <GenericHeader header="Modules" subheader={model && model.code} subtitle={model && model.title} />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable" >
        {tabs.map(tab => <Tab key={tab.value} label={tab.label} value={tab.value} />)}
      </Tabs>
      <LoadingIndicator variant="card" active={loading} />
      <ErrorMessage message={errorMessage} />
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === "summary" && <Summary onUpdate={update} model={model} />}
        {tab === "topics" && <Topics onUpdate={update} model={model} />}
      </div>
    </Page>
  );
};

ModuleDetail.propTypes = {
};

export default ModuleDetail;
