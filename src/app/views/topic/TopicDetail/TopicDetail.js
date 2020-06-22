import { colors, Divider, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ErrorMessage, GenericHeader, LoadingIndicator, Page } from "app/components";
import { API } from "app/services";
import { ModelsActions } from "app/store/actions";
import { useErrorCatcher } from "app/utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Summary } from "./components";

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
const TopicDetail = props => {
  const classes = useStyles();

  const { match, history } = props;
  const { topicId, tab } = match.params;

  const dispatch = useDispatch();
  const model = useSelector(state => state.models.topic);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const runAsyncBlock = useErrorCatcher(error => setErrorMessage(error && error.message));

  const update = () => {
    setLoading(true);
    dispatch(ModelsActions.update_model({ topic: null }));
    runAsyncBlock(async () => {
      const { model } = await API.Topic.detail(topicId);
      if (mounted) {
        dispatch(ModelsActions.update_model({ topic: model }));
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
  }, [topicId]);

  const handleTabsChange = (event, value) => {
    history.push(value);
  };


  const tabs = [
    { value: "summary", label: "Summary" },
  ];

  if (!tab) {
    return <Redirect to={`/topics/${topicId}/summary`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  return (
    <Page className={classes.root} title="Topics" >
      <GenericHeader header="Topics" subheader={model && model.name} />
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
      </div>
    </Page>
  );
};

TopicDetail.propTypes = {
};

export default TopicDetail;
