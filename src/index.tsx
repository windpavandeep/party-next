import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import NavigateRouters from './navigation/index';
import {persistor, store} from '@src/app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <NavigateRouters />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
