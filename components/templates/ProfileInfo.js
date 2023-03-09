import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Text from '../atoms/Text';
import {StyleSheet, View} from 'react-native';
import Separator from '../atoms/Separator';
import Avatar from '../atoms/Avatar';
import {Appbar, Menu, Divider, Provider} from 'react-native-paper';
import {getQuote} from 'utils/quotes';
import Icon from 'components/atoms/Icon';

const quote = getQuote();
const ProfileInfo = ({mediaCount}) => {
  const navigation = useNavigation();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const uploadMedia = () => {
    closeMenu();
    navigation.navigate('Upload');
  };
  const updateProfile = () => {
    closeMenu();
    navigation.navigate('Update');
  };

  const logout = async () => {
    console.log('Logging out!');
    setUser({});
    setIsLoggedIn(false);
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.log('clearing asyncstorage failed', error);
    }
  };

  return (
    <Provider>
      <View style={styles.header}>
        <Appbar.Action
          icon={() => <Icon label="video" size={27} />}
          onPress={uploadMedia}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon={() => <Icon label="more" size={27} />}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            titleStyle={styles.menuItem}
            onPress={updateProfile}
            title="Edit profile"
          />
          <Divider />
          <Menu.Item
            titleStyle={styles.menuItem}
            onPress={logout}
            title="Logout"
          />
        </Menu>
      </View>

      <View style={styles.info}>
        <Avatar size={100} userId={user.user_id} onPress={updateProfile} />
        <Separator height={16} />
        <Text type="title">{user.full_name}</Text>
        <Separator height={4} />
        <Text type="subHeading">@{user.username}</Text>
        <Separator height={14} />
        <Text type="subHeading" style={{textAlign: 'center'}}>
          {quote}
        </Text>
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  menuItem: {
    fontSize: 14,
    color: '#0D0D25',
  },
  textName: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileInfo;
