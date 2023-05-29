import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '@screens/login/index';
import OTP from '@screens/otp';
import SignUp from '@screens/signup';
import CreateClub from '@screens/create-club';
import Home from '@screens/home';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ARROW_LEFT,
  BARCODE,
  BARCODE_ACTIVE,
  EVENTS,
  EVENTS_ACTIVE,
  HOME,
  HOME_ACTIVE,
  LOGO,
  NOTIFICATION,
  PROFILE,
  PROFILE_ACTIVE,
} from '@assets/icons';
import {Color, FontFamily, FontSize} from '@utils/GlobalStyles';
import Events from '@screens/events';
import Profile from '@screens/profile';
import Scanner from '@screens/scanner';
import EventDetails from '@screens/event-detail';
import EditProfile from '@screens/edit-profile';
import Settings from '@screens/settings';
import ChangePassword from '@screens/change-password';
import {useAppSelector} from '@src/app/hooks';
import Handler from '@src/screens/handler';
import AddUser from '@src/screens/add-user';
import CreateEvent from '@src/screens/create-event';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: Color.textWhiteFFFFFF,
        tabBarLabelStyle: {
          fontSize: FontSize.size_sm,
          fontFamily: FontFamily.poppinsRegular,
        },
        headerStyle: {
          backgroundColor: Color.gray_100,
        },
        headerTitleStyle: {
          fontFamily: FontFamily.poppinsSemibold,
          color: Color.textWhiteFFFFFF,
          fontSize: FontSize.size_sm,
        },
        headerTitle: () => <></>,
        headerLeft: () => (
          <View style={{paddingLeft: 20}}>
            <LOGO />
          </View>
        ),
        headerRight: () => (
          <View style={{paddingRight: 20}}>
            <NOTIFICATION />
          </View>
        ),
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (focused ? <HOME_ACTIVE /> : <HOME />),
          tabBarStyle: styles.tabBarStyle,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Events"
        options={{
          tabBarIcon: ({focused}) => (focused ? <EVENTS_ACTIVE /> : <EVENTS />),
          tabBarStyle: styles.tabBarStyle,
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: 'Events',
        }}
        component={Events}
      />

      <Tab.Screen
        name="Scan"
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <BARCODE_ACTIVE /> : <BARCODE />,
          tabBarStyle: styles.tabBarStyle,
          headerShown: false,
        }}
        component={Scanner}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <PROFILE_ACTIVE /> : <PROFILE />,
          tabBarStyle: styles.tabBarStyle,
          headerLeft: () => <></>,
          headerRight: () => <></>,
          headerTitle: 'My Profile',
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const NavigateRouters = () => {
  const {isAuth, user} = useAppSelector(({authUser}) => authUser);
  const {goBack} = useNavigation();

  console.log(' === isAuth === ', isAuth, user);

  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Color.gray_100,
          },
          headerTitleStyle: {
            fontFamily: FontFamily.poppinsSemibold,
            color: Color.textWhiteFFFFFF,
          },
          headerLeft: () => (
            <TouchableOpacity
              hitSlop={{left: 15, right: 15}}
              onPress={() => goBack()}>
              <ARROW_LEFT />
            </TouchableOpacity>
          ),
        }}>
        {!isAuth && (
          <>
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
          </>
        )}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PrivateStack"
          component={TabNavigation}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Create/Edit Club',
          }}
          name="CreateClub"
          component={CreateClub}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Create Event',
          }}
          name="CreateEvent"
          component={CreateEvent}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Event Detail',
          }}
          name="EventDetails"
          component={EventDetails}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Edit Profile Details',
          }}
          name="ProfileEdit"
          component={EditProfile}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Settings',
          }}
          name="Settings"
          component={Settings}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Manage Handler',
          }}
          name="Handler"
          component={Handler}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Create Handler User',
          }}
          name="AddUser"
          component={AddUser}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Change Password',
          }}
          name="ChangePassword"
          component={ChangePassword}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Color.gray_100,
    borderWidth: 0,
    height: 90,
    borderTopWidth: 1,
    borderTopColor: Color.dimgray,
  },
});

export default NavigateRouters;
