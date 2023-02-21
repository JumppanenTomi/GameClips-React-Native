import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainContext } from 'contexts/MainContext';
import Login from 'views/Login';
import Home from 'views/Home';
import Profile from '../views/Profile';
import Upload from "views/Upload";
import Browse from "views/Browse";
import Onboarding from "views/Onboarding";
import Single from "views/Single";
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}  />
      <Tab.Screen name="Browse" component={Browse} options={{ headerShown: false }}  />
      <Tab.Screen name="Favorites" component={Home} options={{ headerShown: false }}  />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}  />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const { isLoggedIn } = useContext(MainContext);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            screenOptions={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Upload" component={Upload} />
          <Stack.Screen name="Single" component={Single} />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
