import React from 'react';

// Create a context with default values
const AppContext = React.createContext({
  appLanguage: 'en',
  setAppLanguage: () => {},

  selectedLanguage: 'en',
  setSelectedLanguage: () => {},
});

export default AppContext;