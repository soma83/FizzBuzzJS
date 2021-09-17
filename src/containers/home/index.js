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
  const [update, setUpdate] = useState(false);

  const calculate = () => {
    const d = [];
    d.push([intl.formatMessage({id: 'users'}), intl.formatMessage({id: 'completed'})]);
    Object.keys(global.users).forEach(x => {
      const val = global.users[x].completed;
      d.push([x, val]);
    });
    setData(d);
  };

  useEffect(() => {
    setUpdate(true);
    calculate();
  }, [global.lang, global.active]);

  useEffect(() => {
    if (update) {
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    calculate();
  }, []);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">{intl.formatMessage({id: 'welcome'})}</Typography>
      <div className={classes.topMargin}>
        {!update ? (
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
              bar: {groupWidth: '50%'}
            },
          }}
          rootProps={{'data-testid': '2'}}
        />
        ) : <Typography>{intl.formatMessage({id: 'loading'})}</Typography>}
      </div>
    </Paper>
  );
};

export default Index;
