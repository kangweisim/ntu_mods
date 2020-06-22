import { makeStyles } from "@material-ui/styles";
import { GenericHeader, Page, SearchBar } from "app/components";
import { FilterActions } from "app/store/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopicListing } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
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
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filters.topics)

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
    // eslint-disable-next-line
  }, []);

  const handleSearch = (search) => {
    dispatch(FilterActions.update_filters({ topics: { ...filter, search: search, offset: 0 } }));
  }

  return (
    <Page className={classes.root} title="Topics" >
      <GenericHeader header="Topics" subheader="Listing" />
      <SearchBar onSearch={handleSearch} onFilter={() => {}} Filter={null} />
      <TopicListing />
    </Page>
  );
};

ModuleList.propTypes = {
};

export default ModuleList;
