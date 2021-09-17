import React from 'react';

export const globals = {
  active: null,
  users: {
    user: {
      passw: '12345',
      lang: 'en',
      completed: 0
    }
  }
};

const GlobalContext = React.createContext(globals);

export default GlobalContext;
