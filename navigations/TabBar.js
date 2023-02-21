import { StyleSheet, View } from 'react-native';
import { Appbar, Button, IconButton } from 'react-native-paper';
import Icon from 'components/atoms/Icon';
import AppbarButton from './AppbarButton';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <Appbar style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <View key={index}>
            {isFocused ? (
              <AppbarButton label={label} />
            ) : (
              <Appbar.Action
                icon={() => <Icon label={label} />}
                color={isFocused ? '#0c766b' : 'black'}
                onPress={onPress}
                key={item => item}
              />
            )}
          </View>
        );
      })}
    </Appbar>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25253B',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 24,
    height: 90,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
})

export default TabBar;