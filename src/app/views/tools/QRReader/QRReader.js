import { Box, Card, CardContent, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { GenericHeader, Page } from "app/components";
import PropTypes from "prop-types";
import React from "react";
import QRDropzone from "./components/QRDropzone";

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    minWidth: 700,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

// let mounted = false;
const QRReader = props => {
  const classes = useStyles();

  // useEffect(() => {
  //   mounted = true;
  //   return () => mounted = false;
  //   // eslint-disable-next-line
  // }, []);

  return (
    <Page className={classes.root} title="QR Reader">
      <Box display="block" displayPrint="none">
        <GenericHeader header="Tools" subheader="QR Reader" />
        <Divider className={classes.divider} />
        <Card>
          <CardContent>
            <QRDropzone />
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
};

QRReader.propTypes = {
  className: PropTypes.string,
};

QRReader.defaultProps = {
  pathPrefix: "/tools/qr-reader",
};

export default QRReader;
