import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from "@material-ui/core/Toolbar";
import styles from "../../styles/main-jss";
import MainMenu from "../menu/MainMenu";

const useStyles = makeStyles(theme => styles(theme));

const Main = ({children}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Header/>
      <MainMenu/>
      <main className={classes.content}>
        <Toolbar/>
        <div>
          {children}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
