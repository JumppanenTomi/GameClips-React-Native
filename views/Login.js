import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from 'contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from 'hooks/ApiHooks';
import LoginForm from 'components/templates/LoginForm';
import RegisterForm from 'components/templates/RegisterForm';
const introImage = require('assets/imgs/intro-background.jpg');

const Login = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggle, setToggle] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) return;
      const userData = await getUserByToken(userToken);
      console.log('The profile data is ', userData);
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log('no token found');
    }
  };

  const handleToggle = () => setToggle(!toggle);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={introImage}
    >
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
        style={styles.touchable}
      >
        {toggle ? (
          <LoginForm handleToggle={handleToggle} />
        ) : (
          <RegisterForm handleToggle={handleToggle} />
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  touchable: {
    flex: 1,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
