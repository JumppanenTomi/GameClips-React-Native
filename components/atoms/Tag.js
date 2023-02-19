import {Chip} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const Tag = ({children, onPress, style, ...rest}) => {
  const chipStyle = [styles.chip, style];
  return (
    <Chip
      style={chipStyle}
      textStyle={styles.chipText}
      onPress={onPress}
      compact
    >
      {children}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#0D0D25',
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 2,
  },
});

export default Tag;
