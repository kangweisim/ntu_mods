import { makeStyles } from "@material-ui/core";
import { useMoneyFormatter } from "app/utils";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import MonoText from "../MonoText";

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

const MoneyLabel = props => {
  const { className, formatter, children, currency, component: Component, emptyValue, ...rest } = props;

  const classes = useStyles();

  const moneyFormatter = useMoneyFormatter({
    showCurrency: true,
    currency,
    ...formatter,
  });

  return (
    <Component {...rest} className={clsx(classes.root, className)}>
      {moneyFormatter(children)}
    </Component>
  );
};

MoneyLabel.propTypes = {
  className: PropTypes.string,
  emptyValue: PropTypes.string,
  person: PropTypes.object,
};

MoneyLabel.defaultProps = {
  component: MonoText,
  emptyValue: "-",
  formatter: {},
  person: {},
  map: {},
};

export default MoneyLabel;
