import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from '@src/app/store';
import {PersistGate} from 'redux-persist/integration/react';
import NavigateRouters from './navigation/index';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <NavigateRouters />
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
