import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../atoms/Text';
import { StyleSheet, View } from 'react-native';
import Separator from '../atoms/Separator';
import Avatar from '../atoms/Avatar';
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import { getQuote } from 'utils/quotes';
import Ionicons from "@expo/vector-icons/Ionicons";

const quote = getQuote();
const ProfileInfo = ({ mediaCount, navigation }) => {
  const { setIsLoggedIn, user, setUser } = useContext(MainContext);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const uploadMedia = () => {
    closeMenu();
    navigation.navigate('Upload');
  }
  const updateProfile = () => {
    closeMenu();
    navigation.navigate('Update');
  }

  const logout = async () => {
    console.log('Logging out!');
    setUser({});
    setIsLoggedIn(false);
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      console.log('clearing asyncstorage failed', e);
    }
  };

  return (
    <Provider>
      <View style={{ flex: 1, paddingLeft: 24, paddingRight: 24, flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
        <Ionicons name="md-videocam" size={27} color="#ffffff" onPress={uploadMedia} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon={() => <Ionicons name="ellipsis-horizontal-outline" size={27} color="#ffffff" onPress={openMenu} />} />}>
          <Menu.Item titleStyle={styles.menuItem} onPress={updateProfile} title="Edit profile" />
          <Divider />
          <Menu.Item titleStyle={styles.menuItem} onPress={logout} title="Logout" />
        </Menu>
      </View>

      <View style={styles.info}>
        <Avatar size={100} userID={user.user_id} onPress={updateProfile} />
        <Separator height={16} />
        <Text type="title">
          {user.full_name}
        </Text>
        <Separator height={4} />
        <Text type="subHeading">@{user.username}</Text>
        <Separator height={14} />
        <Text type="subHeading" style={{ textAlign: 'center' }}>{quote}</Text>
        <Separator height={14} />
        <Text type="title">{mediaCount}</Text>
        <Separator height={8} />
        <Text type="subHeading">Clip(s)</Text>
        <Separator height={8} />
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
    paddingHorizontal: 40,
  },
  menuItem: {
    fontSize: 14,
    color: "#0D0D25"
  },
  textName: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileInfo;
