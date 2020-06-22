/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography, Link } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import { makeStyles } from "@material-ui/styles";
import { ErrorMessage } from "app/components";
import { API } from "app/services";
import { ProfileActions } from "app/store/actions";
import strings from "app/strings";
import { useErrorCatcher } from "app/utils";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import validate from "validate.js";
import { Link as RouterLink } from 'react-router-dom';


const schema = {
  username: {
    presence: { allowEmpty: false, message: "^Login ID is required" },
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
const LoginForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState(null);
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
      const { username, } = formState.values;
      await API.Auth.password_request({ username });
      if (mounted) {
        setShowSuccess(true);
      }
    }).finally(() => mounted && setLoading(false));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  if (showSuccess) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" className={classes.success}>
        <CheckCircleIcon fontSize="large" />
        <Typography color="inherit" variant="h4">Password reset email sent. Please check your email for instructions.</Typography>
        <Typography color="inherit" variant="caption">
          <Link align="center" color="secondary" component={RouterLink} to="/auth/login" underline="always" variant="subtitle2" >
            Back to login
          </Link></Typography>
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
          error={hasError("username")}
          fullWidth
          helperText={hasError("username") ? formState.errors.username[0] : null}
          label="Login ID"
          name="username"
          onChange={handleChange}
          value={formState.values.username || ""}
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
        Request
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;
