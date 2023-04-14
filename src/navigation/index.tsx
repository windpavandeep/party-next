import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@screens/login/index';
import OTP from '@screens/otp';
import SignUp from '@screens/signup';
import CreateClub from 'src/screens/create-club';

const Stack = createNativeStackNavigator();

const NavigateRouters = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateClub">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="OTP"
          component={OTP}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="CreateClub"
          component={CreateClub}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigateRouters;
