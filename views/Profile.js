import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import ProfileInfo from '../components/templates/ProfileInfo';
import ProfileForm from '../components/templates/ProfileForm';

const Profile = ({ navigation }) => {
  const [toggleForm, setToggleForm] = useState(true);

  const handleToggle = () => setToggleForm(!toggleForm);

  return (
    <SafeAreaView style={{
      backgroundColor: '#0D0D25',
    }}>
      <ScrollView>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
          {toggleForm ? <ProfileInfo /> : <ProfileForm />}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
