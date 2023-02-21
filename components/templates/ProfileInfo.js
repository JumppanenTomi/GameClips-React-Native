import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../atoms/Text';
import { StyleSheet, View } from 'react-native';
import Separator from '../atoms/Separator';
import Avatar from '../atoms/Avatar';
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'components/atoms/Icon';

const ProfileInfo = ({ navigation, handleToggle }) => {
  const { setIsLoggedIn, user, setUser } = useContext(MainContext);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);


  const logout = async () => {
    console.log('Logging out!');
    setUser({});
    setIsLoggedIn(false);
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('clearing asyncstorage failed', e);
    }
  };

  return (
    <Provider>
      <Appbar style={styles.header}>
        <Appbar.Action icon={() => <Icon label="Video" />} onPress={() => navigation.navigate('Upload')} />
        <Menu
          contentStyle={{ backgroundColor: "#25253B"}}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon={() => <Icon label="More" />} onPress={openMenu} />}>
          <Menu.Item titleStyle={{ color: "#9E9EA8" }} onPress={() => navigation.navigate('Update')} title="Edit profile" />
          <Divider />
          <Menu.Item titleStyle={{ color: "#9E9EA8" }} onPress={logout} title="Logout" />
        </Menu>
      </Appbar>

      <View style={styles.info}>
        <Avatar size={100} userID={user.user_id} />
        <Separator height={10} />
        <Text type="body" style={styles.textName}>
          {user.full_name}
        </Text>
        <Text type="subHeading">@{user.username}</Text>
        <Text type="subHeading">I just no one that love to do livestream.</Text>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#0D0D25',
    justifyContent: 'space-between',
  },
  info: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textName: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileInfo;
