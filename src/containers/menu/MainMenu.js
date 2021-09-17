import React, {useContext} from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from "@material-ui/core/styles";
import styles from '../../styles/main-jss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import GlobalContext from '../wrappers/GlobalContext';
import {useIntl} from 'react-intl';

const useStyles = makeStyles(theme => styles(theme));

const MainMenu = () => {
  const classes = useStyles();
  const {global} = useContext(GlobalContext);

  const intl = useIntl();

  return (
    <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }} >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <Link to="/" className={classes.links}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={intl.formatMessage({ id: 'home' })} />
            </ListItem>
          </Link>
          <Link to="/fizzbuzz" className={classes.links}>
            <ListItem button>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary={'FizzBuzz'} />
            </ListItem>
          </Link>
          <Link to="/about" className={classes.links}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={intl.formatMessage({ id: 'about' })} />
            </ListItem>
          </Link>
        </List>
      </div>
    </Drawer>
  )
};

export default MainMenu;
