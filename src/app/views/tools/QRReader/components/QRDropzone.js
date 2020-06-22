import { Button, colors, IconButton, InputAdornment, Link, Snackbar, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { ErrorMessage, LoadingIndicator } from 'app/components';
import { isUrl } from 'app/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import qrCodeReader from 'qrcode-reader';
import React, { useCallback, useState } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  image: {
    width: 130
  },
  info: {
    marginTop: theme.spacing(1)
  },
  error: {
    flex: 1
  },
  container: {
    width: 500,
    margin: "0 auto",
  },
  qr: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2)

  }
}));

const FilesDropzone = props => {
  const { className, types = [], fileLoading, ...rest } = props;

  const classes = useStyles();
  const [dataUrl, setDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const [link, setLink] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };


  const handleDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      let imageFile = acceptedFiles[0];
      const reader = new FileReader();
      const qr = new qrCodeReader();
      qr.callback = (err, result) => {
        if (err) return setError(err);
        setLink(result.result);
      }

      reader.onload = () => {
        setDataUrl(reader.result);
        qr.decode(reader.result);
      }
      reader.readAsDataURL(imageFile);
    }
    // eslint-disable-next-line
  }, []);

  const mimes = types.map((type) => type.mime);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false
  });

  const handleClear = () => {
    setDataUrl(null);
    setLink(null);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {(!dataUrl) && !fileLoading &&
        <div
          className={clsx({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} accept={mimes} />
          <div>
            <img
              alt="Select QR Code File"
              className={classes.image}
              src="/images/undraw_add_file2_gvbb.svg"
            />
          </div>
          <div>
            <Typography
              gutterBottom
              variant="h3"
            >
              {"Select file"}
            </Typography>
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="body1"
            >
              Drop file here or click to <Link underline="always">browse</Link>{' '}
              through your machine
          </Typography>
            {types && types.length > 0 && (
              <Typography
                className={classes.info}
                color="textSecondary"
                variant="body1"
              >
                Only {types.reduce((acc, val) => acc + val.format + ", ", "").slice(0, -2)} filetypes accepted
              </Typography>
            )}
          </div>
        </div>
      }
      <LoadingIndicator active={fileLoading} variant="card" />
      {dataUrl &&
        <div className={classes.container}>
          <div>
            <img alt="qr_code" className={classes.qr} src={dataUrl} />
          </div>
          <ErrorMessage message={error} />
          {link &&
            <TextField
              fullWidth
              label={isUrl(link) ? "Link" : "Message"}
              readOnly
              type="url"
              value={link}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <CopyToClipboard text={link} onCopy={() => setSnackbarOpen(true)}>
                    <IconButton>
                      <FileCopyIcon />
                    </IconButton>
                  </CopyToClipboard>
                </InputAdornment>,
              }}
            />
          }
          <div className={classes.buttons}>
            <Button onClick={handleClear} variant="contained" className={classes.button}>
              BACK
            </Button>
            {isUrl(link) && <Button component="a" target="_blank" href={link} color="primary" variant="contained" className={classes.button}>
              Go
            </Button>}
          </div>
        </div>
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Link copied!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

FilesDropzone.propTypes = {
  className: PropTypes.string
};

export default FilesDropzone;
