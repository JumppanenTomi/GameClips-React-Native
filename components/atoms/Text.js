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
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    color: '#939393',
  },
  brightSubHeading: {
    fontSize: 14,
    color: '#BFBFBF',
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
  meta: {
    fontSize: 12,
    color: '#FFF'
  }
});

export default Text;
