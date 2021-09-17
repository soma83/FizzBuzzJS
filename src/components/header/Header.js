import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../../styles/main-jss';
import UserMenu from "../../containers/menu/UserMenu";

const useStyles = makeStyles(theme => styles(theme));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h3" className={classes.title}>
              FizzBuzz
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <div style={{ textAlign: 'right', marginRight: '-30px' }}>
            <UserMenu/>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
