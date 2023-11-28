import React from 'react';

// Create a context with default values
const AppContext = React.createContext({
  appLanguage: '',
  setAppLanguage: () => {},

  selectedLanguage: '',
  setSelectedLanguage: () => {},
});

export default AppContext;