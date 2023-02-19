import React, {useContext, useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ProfileInfo from '../components/templates/ProfileInfo';
import ProfileForm from '../components/templates/ProfileForm';

const Profile = ({navigation}) => {
  const [toggleForm, setToggleForm] = useState(true);

  const handleToggle = () => setToggleForm(!toggleForm);

  return (
    <ScrollView
      style={{
        backgroundColor: '#0D0D25',
      }}
    >
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        {toggleForm ? <ProfileInfo /> : <ProfileForm />}
      </TouchableOpacity>
    </ScrollView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
