import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useIntl} from "react-intl";
import GlobalContext from "../wrappers/GlobalContext";
import blue from '@material-ui/core/colors/blue';
import Error from "../../components/error/Error";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const UserDialog = ({handleClose}) => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);

  const {global, setGlobal} = useContext(GlobalContext);

  const intl = useIntl();

  const loginOp = () => {
    const {users} = global;
    const willActive = Object.keys(users).find(x => x === username && users[x].passw === password);
    if (willActive) {
      setGlobal({...global, active: willActive});
      handleClose();
    } else {
      setError(intl.formatMessage({id: 'unknown.user'}));
    }
  };

  const register = () => {
    const glb = {...global};
    if (Object.keys(glb.users).includes(username)) {
      setError(intl.formatMessage({id: 'username.taken'}));
    } else {
      glb.users[username] = {passw: password, completed: 0};
      glb.active = username;
      setGlobal(glb);
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
        open={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {intl.formatMessage({id: login ? 'login' : 'register'})}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <TextField
              label={intl.formatMessage({id: 'username'})}
              placeholder={intl.formatMessage({id: 'username.here'})}
              fullWidth
              type="text"
              margin="dense"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
              variant="outlined"
            />
          </Typography>
          <TextField
            label={intl.formatMessage({id: 'password'})}
            placeholder={intl.formatMessage({id: 'password.here'})}
            fullWidth
            type="password"
            margin="dense"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            variant="outlined"
          />
          {!login && (
            <TextField
              label={intl.formatMessage({id: 'confirm.passw'})}
              placeholder={intl.formatMessage({id: 'confirm.passw.here'})}
              fullWidth
              type="password"
              margin="dense"
              value={confirm}
              error={confirm !== password}
              helperText={confirm !== password ? intl.formatMessage({id: 'passw.no.match.confirm'}) : ''}
              onChange={e => {
                setConfirm(e.target.value);
              }}
              variant="outlined"
            />
          )}
          <Typography gutterBottom onClick={() => {
            setLogin(!login);
            setConfirm('');
          }} style={{cursor: 'pointer', marginTop: '20px', color: blue[500]}}>
            {intl.formatMessage({id: login ? 'registerq' : 'loginq'})}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (login) {
                loginOp();
              } else {
                register();
              }
            }}
            color="primary"
            disabled={(login && (!password.length || !username.length)) || (!login && (!password.length || !username.length || confirm !== password))}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {error && <Error handleClose={() => {
        setError(null);
      }} message={error}/>}
    </>
  );
};

UserDialog.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default UserDialog;
