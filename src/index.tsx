import React from 'react';
import NavigateRouters from './navigation/index';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <NavigateRouters />
    </NavigationContainer>
  );
};

export default App;
