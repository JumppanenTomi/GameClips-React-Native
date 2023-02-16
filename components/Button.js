import { StyleSheet } from 'react-native';
import { Button as RNPButton } from 'react-native-paper';

const Button = ({ children, onPress, fullWidth, style, ...restProps }) => {
  const buttonStyle = [
    styles.button,
    fullWidth && styles.fullWidth,
    style
  ];

  return (
    <RNPButton
      mode='contained'
      style={buttonStyle}
      contentStyle={{
        paddingVertical: 5,
      }}
      onPress={onPress}
      {...restProps}
    >
      {children}
    </RNPButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#8C8AFA',
    fontSize: 16,
    fontFamily: 'Roboto',
    borderRadius: 100,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;
