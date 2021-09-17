const drawerWidth = '200px';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  marginTop: {
    marginTop: '10px'
  },
  links: {
    textDecoration: 'none',
    color: 'rgb(0,0,0)'
  },
  headerProperties: {
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    zIndex: 1
  },
  paper: {
    padding: '10px',
    '@media (maxWidth: 600px)': {
      padding: '5px 5px 5px 5px',
    },
    color: theme.palette.text.secondary
  }
});

export default styles;
