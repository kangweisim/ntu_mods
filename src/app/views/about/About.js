import { colors, Card, CardContent, Box, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { GenericHeader, Page } from "app/components";
import React from "react";
import GitHubIcon from '@material-ui/icons/GitHub';

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
const About = props => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="About" >
      <GenericHeader header="NTU MODS" subheader="About" />
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2">GitHub</Typography>
            <GitHubIcon style={{ fontSize: 60, marginBottom: 20, marginTop: 20 }} />
            <Link target="_blank" href="https://github.com/kangweisim/ntu_mods">https://github.com/kangweisim/ntu_mods</Link>
            <Link target="_blank" href="https://github.com/kangweisim/ntu_mods_core">https://github.com/kangweisim/ntu_mods_core</Link>
          </Box>
        </CardContent>
      </Card>
    </Page>
  );
};

About.propTypes = {
};

export default About;
