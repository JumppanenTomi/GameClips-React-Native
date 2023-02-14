import React, { useContext } from 'react';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainContext } from '../contexts/MainContext';
import Login from '../views/Login';
import Home from '../views/Home';

//const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/*
const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({color}) => <Icon name="cloud-upload" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
*/

const StackScreen = () => {
  const { isLoggedIn } = useContext(MainContext);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {isLoggedIn ? (
        <>
          {/* <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} /> */}
          <Stack.Screen name="Home" component={Home} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
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
