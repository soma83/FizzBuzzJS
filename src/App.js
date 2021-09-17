import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Application from './containers/application/Application';
import {IntlProvider} from 'react-intl';

import engMsgs from './translations/en.json';
import espMsgs from './translations/es.json';
import GlobalContext, {globals} from "./containers/wrappers/GlobalContext";
import {makeStyles} from "@material-ui/core/styles";

const msgs = {
  'en': engMsgs,
  'es': espMsgs
};

const styles = () => ({
  styling: {
    width: '100%',
    minHeight: '100%',
    marginTop: 0,
    zIndex: 1
  }
});

const useStyles = makeStyles(() => styles());

function App() {
  const classes = useStyles();
  const [global, setGlobal] = useState(globals);
  const [locale, setLocale] = useState('en');

  if (global && global.active) {
    const {lang} = global.users[global.active];
    if (lang !== locale) {
      setLocale(lang);
    }
  }

  return (
    <IntlProvider locale={locale} messages={msgs[locale]}>
      <div className={classes.styling}>
        <GlobalContext.Provider value={{global, setGlobal}}>
        <Router>
          <Switch>
            <Route path="/" component={Application}/>
          </Switch>
        </Router>
        </GlobalContext.Provider>
      </div>
    </IntlProvider>
  );
}

export default App;
