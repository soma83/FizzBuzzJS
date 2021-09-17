import React from 'react';

export const globals = {
  active: null,
  lang: 'en',
  users: {
    user: {
      passw: '12345',
      completed: 0
    }
  }
};

const GlobalContext = React.createContext(globals);

export default GlobalContext;
