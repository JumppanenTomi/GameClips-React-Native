import React, { useContext } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainContext } from '../contexts/MainContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from '../views/Login';
import Home from '../views/Home';
import Upload from "../views/Upload";
import Onboarding from "../views/Onboarding";
import Single from "../views/Single";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarLabel: navigation.isFocused() ? route.name : '',
        tabBarStyle: {
          paddingLeft: 24,
          paddingRight: 24,
          height: 100,
          position: 'absolute',
          backgroundColor: '#25253B',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          lineHeight: 16,
          marginLeft: 8,
          marginRight: 21,
          zIndex: -1,
        },
        tabBarIconStyle: {
          marginTop: 0,
          height: 42,
          width: 42,
          borderRadius: 100,
          backgroundColor: navigation.isFocused() ? '#AFADFC' : 'transparent',
        },
        tabBarItemStyle: {
          flex: navigation.isFocused() ? 3 : 2,
          borderRadius: navigation.isFocused() ? 100 : 0,
          height: 42,
          marginTop: 24,
          marginBottom: 24,
          justifyContent: 'flex-start'
        },
        tabBarActiveBackgroundColor: '#8C8AFA',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#9E9EA8',
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({color}) => <Ionicons name="home" color={color} style={{fontSize: 24,}} />,
      }}/>
      <Tab.Screen name="Browse" component={Upload} options={{
        tabBarIcon: ({color}) => <Ionicons name="search" color={color} style={{fontSize: 24,}} />,
      }}/>
      <Tab.Screen name="Favorites" component={Home} options={{
        tabBarIcon: ({color}) => <Ionicons name="heart" color={color} style={{fontSize: 24,}} />,
      }}/>
      <Tab.Screen name="Profile" component={Upload} options={{
        tabBarIcon: ({color}) => <Ionicons name="person" color={color} style={{fontSize: 24,}} />,
      }}/>
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
