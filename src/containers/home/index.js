import React, {useContext, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chart from 'react-google-charts';
import GlobalContext from '../wrappers/GlobalContext';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../../styles/main-jss';

const useStyles = makeStyles(theme => styles(theme));

const Index = () => {
  const classes = useStyles();
  const intl = useIntl();
  const {global} = useContext(GlobalContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = [];
    d.push([intl.formatMessage({id: 'users'}), intl.formatMessage({id: 'completed'})]);
    Object.keys(global.users).forEach(x => {
      const val = global.users[x].completed;
      d.push([x, val]);
    });
    setData(d);
  }, []);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">{intl.formatMessage({id: 'welcome'})}</Typography>
      <div className={classes.topMargin}>
        <Chart
          width={'100%'}
          height={'450px'}
          chartType="Bar"
          loader={<div>{intl.formatMessage({id: 'loading'})}</div>}
          data={data}
          options={{
            chart: {
              title: intl.formatMessage({id: 'completed.by.users'}),
              subtitle: '',
              legend: {position: 'none'},
            },
          }}
          rootProps={{'data-testid': '2'}}
        />
      </div>
    </Paper>
  );
};

export default Index;
