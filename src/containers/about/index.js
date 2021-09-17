import React from 'react';
import {useIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import clx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../../styles/main-jss';

const useStyles = makeStyles(theme => styles(theme));

const About = () => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h5">{intl.formatMessage({id: 'about'})}</Typography>
        <Typography>{intl.formatMessage({id: 'built'})}</Typography>
      </Paper>
      <Paper className={clx(classes.paper, classes.marginTop)}>
        <Typography variant="h5">{intl.formatMessage({id: 'help'})}</Typography>
        <Typography>{intl.formatMessage({id: 'helpcomment'})}</Typography>
        <Typography>{intl.formatMessage({id: 'helpcomment1'})}</Typography>
        <Typography>{intl.formatMessage({id: 'helpcomment2'})}</Typography>
      </Paper>
    </>
  );
};

export default About;
