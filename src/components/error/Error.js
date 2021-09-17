import React from 'react';
import PropTypes from 'prop-types';
import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Error = ({message, handleClose}) => {
  return (
    <Portal>
      <Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </Portal>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Error;
