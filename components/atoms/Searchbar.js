import {StyleSheet} from 'react-native';
import {Searchbar as RNPSearchbar} from 'react-native-paper';
import Icon from './Icon';

const Searchbar = ({value, onChangeText}) => (
  <RNPSearchbar
    icon={() => <Icon label="search" size={16} color="rgba(255,255,255,0.5)" />}
    style={styles.searchbar}
    inputStyle={styles.input}
    placeholder="Search"
    placeholderTextColor={'rgba(255,255,255,0.5)'}
    onChangeText={onChangeText}
    value={value}
    clearIcon={() => (
      <Icon label="close" size={18} color="rgba(255,255,255,0.5)" />
    )}
  />
);

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: '#0D0D25',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    height: 46,
  },
  input: {
    fontSize: 14,
    paddingLeft: 0,
    color: 'white',
  },
});

export default Searchbar;
