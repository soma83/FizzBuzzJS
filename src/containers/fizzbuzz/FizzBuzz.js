import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import {useIntl} from 'react-intl';
import GlobalContext from '../wrappers/GlobalContext';
import Error from '../../components/error/Error';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../../styles/main-jss';
import Paper from '@material-ui/core/Paper';

const KEY_MAP = ['e', 'E', '+', '-'];
const useStyles = makeStyles(theme => styles(theme));

function FizzBuzz() {
  const classes = useStyles();
  const [minimum, setMinimum] = useState(1);
  const [maximum, setMaximum] = useState(100);
  const [error, setError] = useState(null);

  const [solution, setSolution] = useState(null);

  const matches = useMediaQuery('(min-width: 600px)');
  const intl = useIntl();

  const {global, setGlobal} = useContext(GlobalContext);

  const calculateFizzBuzz = () => {
    if (global.active) {
      const min = +minimum;
      const max = +maximum;

      const sol = [];

      for (let i = min; i <= max; i += 1) {
        if (i % 15 === 0) {
          sol.push('FizzBuzz');
        } else if (i % 3 === 0) {
          sol.push('Fizz');
        } else if (i % 5 === 0) {
          sol.push('Buzz');
        } else {
          sol.push('' + i);
        }
      }

      const glb = {...global};
      glb.users[glb.active].completed = glb.users[glb.active].completed + 1;
      setGlobal(glb);

      setSolution(sol);
    } else {
      setError(intl.formatMessage({id: 'must.be.logged'}));
    }
  };

  const allowOnlyNumbers = e => {
    if (KEY_MAP.includes(e.key)) {
      e.preventDefault();
    }
  };

  const updateMin = event => {
    let {value} = event.target;
    if (!value.length) {
      value = 1;
    } else {
      value = +value;
      if (value < 1) {
        value = 1;
      } else if (value > +maximum) {
        value = +maximum - 1;
      }
    }
    setMinimum(value);
  };

  const updateMax = event => {
    let {value} = event.target;
    if (!value.length) {
      value = +minimum + 1;
    } else if (+value < +minimum) {
      value = +minimum + 1;
    }
    setMaximum(value);
  };

  const renderSolution = () => {
    const columns = matches ? 10 : 5;

    const result = [];
    for (let i = 0, l = solution.length; i < l; i += columns) {
      const tempo = solution.slice(i, i + columns);
      result.push(tempo);
    }

    let fizz = 0;
    let buzz = 0;
    let fizzbuzz = 0;
    let numbers = 0;

    const constructOutput = x => (
      x.map(xx => {
        let color = blue[500];
        if (xx === 'Fizz') {
          color = red[500];
          fizz += 1;
        } else if (xx === 'Buzz') {
          color = orange[500];
          buzz += 1;
        } else if (xx === 'FizzBuzz') {
          color = green[500];
          fizzbuzz += 1;
        } else {
          numbers += 1;
        }
        return (<td><Typography style={{color}}>{xx}</Typography></td>)
      })
    );

    return (
      <Paper className={classes.paper}>
        <table style={{width: '100%', tableLayout: 'fixed'}}>
          <tbody>
          {result.map(x => (<tr>{constructOutput(x)}</tr>))}
          </tbody>
        </table>
        <Typography>{intl.formatMessage({id: 'results.details'}, {numbers, fizz, buzz, fizzbuzz})}</Typography>
      </Paper>
    );
  };

  return (
    <>
      {!solution ? (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{intl.formatMessage({id: 'enter.ranges'})}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={intl.formatMessage({id: 'minimum.range'})}
                fullWidth
                type="number"
                onKeyDown={allowOnlyNumbers}
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                margin="dense"
                value={minimum}
                onChange={updateMin}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={intl.formatMessage({id: 'maximum.range'})}
                fullWidth
                type="number"
                onKeyDown={allowOnlyNumbers}
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                margin="dense"
                value={maximum}
                onChange={updateMax}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={calculateFizzBuzz} variant="contained" color="primary">FizzBuzz!</Button>
            </Grid>
          </Grid>
        </Paper>) : (
        <Paper className={classes.paper}>
          <Typography>{intl.formatMessage({id: 'fizzbuzz.in.rage'}, {minimum, maximum})}</Typography>
          {renderSolution()}
          <br/>
          <Button variant="contained" color="primary" onClick={() => {
            setSolution(null);
          }}>{intl.formatMessage({id: 'play.again'})}</Button>
        </Paper>
      )}
      {error && <Error handleClose={() => {
        setError(null);
      }} message={error}/>}
    </>
  );
}

export default FizzBuzz;
