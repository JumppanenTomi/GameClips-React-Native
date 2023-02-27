import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from 'contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from "views/Onboarding";
import Login from 'views/Login';
import Home from 'views/Home';
import Profile from 'views/Profile';
import Upload from "views/Upload";
import Update from "views/Update";
import Browse from "views/Browse";
import Single from "views/Single";
import TabBar from './TabBar';
import ClipList from "views/ClipList";
import { HAS_LAUNCHED_KEY } from 'utils/variables';
import Favorites from "../views/Favorites";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Browse" component={Browse} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const { isLoggedIn } = useContext(MainContext);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED_KEY);
      setShowOnboarding(hasLaunched !== 'true');
    };

    checkOnboardingStatus();
  }, []);

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
          <Stack.Screen name="ClipList" component={ClipList} />
        </>
      ) : (
        showOnboarding ? (
          <Stack.Screen name="Onboarding">
            {props => <Onboarding setShowOnboarding={setShowOnboarding} {...props} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )
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
