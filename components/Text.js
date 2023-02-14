import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as RNPText } from 'react-native-paper';

const Text = ({ children, type, style, ...rest }) => {
  const textStyle = [styles[type], style];

  return (
    <RNPText style={textStyle} {...rest}>
      {children}
    </RNPText>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    color: '#939393',
    marginBottom: 20,
  },
  link: {
    color: '#8C8AFA',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  body: {
    fontSize: 16,
    color: 'black',
    lineHeight: 24,
  },
});

export default Text;
