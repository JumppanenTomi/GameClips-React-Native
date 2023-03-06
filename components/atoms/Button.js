import {StyleSheet} from 'react-native';
import {Button as RNPButton} from 'react-native-paper';

const Button = ({children, onPress, fullWidth, style, ...rest}) => {
  const buttonStyle = [styles.button, fullWidth && styles.fullWidth, style];

  return (
    <RNPButton
      mode="contained"
      style={buttonStyle}
      contentStyle={{
        paddingVertical: 5,
      }}
      onPress={onPress}
      {...rest}
    >
      {children}
    </RNPButton>
  );
};

export const TagButton = ({children, selected, onPress, style, ...rest}) => {
  const buttonStyle = [styles.tagButton, style, {backgroundColor: selected ? '#8C8AFA' : '#0D0D25'}];
  return (
    <RNPButton
      mode="contained"
      style={buttonStyle}
      contentStyle={{
        paddingVertical: 0,
        paddingHorizontal: 12,
      }}
      onPress={onPress}
      compact
      {...rest}
    >
      {children}
    </RNPButton>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    backgroundColor: '#8C8AFA',
    fontSize: 16,
    borderRadius: 100,
  },
  fullWidth: {
    width: '100%',
  },
  tagButton: {
    backgroundColor: '#8C8AFA',
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
  },
});


export default Button;
