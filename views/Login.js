import React, {useContext, useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/templates/LoginForm';
import RegisterForm from '../components/templates/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleForm, setToggleForm] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) return;
      const userData = await getUserByToken(userToken);
      console.log('The user data is ', userData);
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log('no token found');
    }
  };

  const handleToggle = () => setToggleForm(!toggleForm);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0D0D25',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        {toggleForm ? (
          <LoginForm handleToggle={handleToggle} />
        ) : (
          <RegisterForm handleToggle={handleToggle} />
        )}
      </TouchableOpacity>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
