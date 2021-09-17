import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TranslateIcon from '@material-ui/icons/Translate';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GlobalContext from "../wrappers/GlobalContext";
import UserDialog from "../user/UserDialog";
import {useIntl} from "react-intl";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [loginDlg, setLoginDlg] = useState(null);

  const intl = useIntl();

  const {global, setGlobal} = useContext(GlobalContext);

  const handleMenu = menu => event => {
    setOpenMenu(openMenu === menu ? null : menu);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const getAvatar = src => {
    const getFirst = str => str.charAt(0).toUpperCase();
    const x = src.trim().replace(/\s+/g, ' ').split(' ', 2);
    return (
      <Tooltip title={intl.formatMessage({id: 'click.for.options'})}>
        <Avatar>
          {getFirst(x[0]) + (x.length > 1 ? getFirst(x[1]) : '')}
        </Avatar>
      </Tooltip>
    );
  };

  const {active} = global;
  const name = active || intl.formatMessage({id: 'unknown'});

  return (
    <>
      <div style={{display: 'inline-flex'}}>
        <div style={{textAlign: 'right', paddingTop: '14px'}}>
          <Typography style={{fontWeight: 'bold'}}>{name}</Typography>
        </div>
        <Button onClick={handleMenu('user-setting')}>
          {getAvatar(name)}
        </Button>
      </div>
      {anchorEl && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          open={openMenu === 'user-setting'}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            if (!active) {
              setLoginDlg(true);
            } else {
              setGlobal({...global, active: null});
            }
            handleClose();
          }}>
            <ListItemIcon>
              <AccountBoxIcon/>
            </ListItemIcon>
            {intl.formatMessage({id: !active ? 'login.register' : 'logout'})}
          </MenuItem>
          {active && (
            <MenuItem onClick={() => {
              const glb = {...global};
              glb.users[active].lang = glb.users[active].lang === 'en' ? 'es' : 'en';
              setGlobal(glb)
            }}>
              <ListItemIcon>
                <TranslateIcon/>
              </ListItemIcon>
              {intl.formatMessage({id: 'switch.language'})}
            </MenuItem>
          )}
        </Menu>
      )}

      {loginDlg && <UserDialog handleClose={() => {
        setLoginDlg(false);
      }}/>}
    </>
  );
}

export default UserMenu;
