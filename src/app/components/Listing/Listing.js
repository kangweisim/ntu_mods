import { Card, CardActions, CardContent, CardHeader, Divider, makeStyles, TablePagination, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import EmptyState from "../EmptyState";
import LoadingIndicator from "../LoadingIndicator";
import RenderGuard from "../RenderGuard";

const useStyles = makeStyles(theme => ({
  root: {

  },
  inner: {
    minWidth: 700
  },
  content: {
    padding: 0
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: "flex-end"
  },
  spinner: {
    marginTop: theme.spacing(3),
  },
}));

const Listing = (props) => {
  const classes = useStyles();
  const { loading, filter, title, onPageChange, className, children, ...rest } = props;

  const { limit = 10, offset = 0, count = 0 } = filter;
  const page = Math.floor(offset / limit);
  const rowsPerPage = limit;

  const handleChangePage = (event, page) => {
    const new_offset = Math.floor(rowsPerPage * page);
    onPageChange({ limit, offset: new_offset });
  };

  const handleChangeRowsPerPage = event => {
    const rows_per_page = event.target.value;
    onPageChange({ limit: rows_per_page, offset: 0 });
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {!!count && (
          <span>
            {count} Records found. Page {page + 1} of {Math.ceil(count / rowsPerPage)}
          </span>
        )}
        {!count && <span>No records found.</span>}
      </Typography>
      <Card>
        <CardHeader title={title} />
        <LoadingIndicator className={classes.spinner} variant="card" active={loading} />
        <RenderGuard renderIf={!loading}>
          <Divider />
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                {children}
              </div>
            </PerfectScrollbar>
          </CardContent>
          <EmptyState active={!loading && !count} />
          <CardActions className={classes.actions}>
            <TablePagination component="div"
              count={count}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]} />
          </CardActions>
        </RenderGuard>
      </Card>
    </div>
  )
};

Listing.defaultProps = {
  loading: false,
  onPageChange: () => { },
  filter: {},
  title: "Listing",
};

export default Listing;