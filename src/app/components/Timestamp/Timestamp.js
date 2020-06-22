import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
  },
  noValue: {
    opacity: 0.3,
    fontStyle: "italics"
  },
}));

const Timestamp = props => {
  const { className, datetime, date, time, format: inputFormat, component: Component, emptyValue, ...rest } = props;
  let format = inputFormat || "YYYY-MM-DD HH:mm:ss";

  if (date && !inputFormat)
    format = "YYYY-MM-DD";
  else if (time && !inputFormat)
    format = "HH:mm:ss";

  const classes = useStyles();

  let valid = datetime !== undefined;
  let value = null;
  if (valid) {
    value = moment(datetime);
    if (!value.isValid()) valid = false;
    else value = value.format(format);
  }

  const allClasses = [classes.root];
  if (!valid) {
    value = emptyValue;
    allClasses.push(classes.noValue);
  }

  allClasses.push(className);

  return (
    <Component {...rest} className={clsx(allClasses)}>
      {value}
    </Component>
  );
};

Timestamp.propTypes = {
  component: PropTypes.node,
  className: PropTypes.string,
  emptyValue: PropTypes.string,
  person: PropTypes.object,
};

Timestamp.defaultProps = {
  component: "span",
  emptyValue: "-",
  date: false,
  time: false,
  format: null,
  person: {},
  map: {},
};

export default Timestamp;
