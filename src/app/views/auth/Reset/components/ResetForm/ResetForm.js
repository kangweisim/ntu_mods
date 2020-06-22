/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import { makeStyles } from "@material-ui/styles";
import { ErrorMessage } from "app/components";
import { API } from "app/services";
import strings from "app/strings";
import { useErrorCatcher } from "app/utils";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import validate from "validate.js";



const schema = {
  password: {
    presence: { allowEmpty: false, message: "is required" }
  },
  confirm_password: {
    presence: { allowEmpty: false, message: "is required" },
    equality: { attribute: "password", message: "does not match password" }
  },
};

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  success: {
    backgroundColor: theme.palette.success.light,
    borderRadius: 4,
    padding: theme.spacing(2, 2),
    marginTop: theme.spacing(2),
    color: theme.palette.success.contrastText,
  },
}));

let mounted = false;
const ResetForm = props => {
  const { className, token, history, ...rest } = props;

  const classes = useStyles();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const errorCatcher = useErrorCatcher(error => setErrorMessage(error && error.message));

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    setLoading(true);
    errorCatcher(async () => {
      const { password } = formState.values;
      await API.Auth.password_reset({ password, token });
      if (mounted) {
        setShowSuccess(true);
      }

      setTimeout(() => {
        history.push("/auth/login")
      }, 3000);
    }).finally(() => mounted && setLoading(false));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  if (showSuccess) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" className={classes.success}>
        <CheckCircleIcon fontSize="large" />
        <Typography color="inherit" variant="h4">Reset Success</Typography>
        <Typography color="inherit" variant="caption">Redirecting to login page in 5 seconds...</Typography>
      </Box>
    )
  }

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <ErrorMessage message={errorMessage} map={strings.errors.login} />
      <div className={classes.fields}>
        <TextField
          error={hasError("password")}
          fullWidth
          helperText={hasError("password") ? formState.errors.password[0] : null}
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ""}
          variant="outlined"
        />
        <TextField
          error={hasError("confirm_password")}
          fullWidth
          helperText={hasError("confirm_password") ? formState.errors.confirm_password[0] : null}
          label="Confirm Password"
          name="confirm_password"
          onChange={handleChange}
          type="password"
          value={formState.values.confirm_password || ""}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid || loading}
        size="large"
        type="submit"
        variant="contained"
      >
        Reset
      </Button>
    </form>
  );
};

ResetForm.propTypes = {
  className: PropTypes.string
};

export default ResetForm;
