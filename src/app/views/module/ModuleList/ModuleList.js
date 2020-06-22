import { makeStyles } from "@material-ui/styles";
import { GenericHeader, Page, SearchBar } from "app/components";
import { FilterActions } from "app/store/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModuleListing } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

// eslint-disable-next-line
let mounted = false;
const ModuleList = props => {
  const classes = useStyles();
  const filter = useSelector(state => state.filters.modules)
  const dispatch = useDispatch();

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
    // eslint-disable-next-line
  }, []);

  const handleSearch = (search) => {
    dispatch(FilterActions.update_filters({ modules: { ...filter, search: search } }));
  }

  return (
    <Page className={classes.root} title="Modules" >
      <GenericHeader header="Modules" subheader="Listing" subtitle="" />
      <SearchBar onSearch={handleSearch} onFilter={() => {}} Filter={null} />
      <ModuleListing />
    </Page>
  );
};

ModuleList.propTypes = {
};

export default ModuleList;
