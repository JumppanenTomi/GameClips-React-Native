import { StyleSheet, View } from 'react-native';
import { Button, IconButton } from "react-native-paper";
import Icon from 'components/atoms/Icon';

const AppbarButton = ({ label }) => (
  <Button
    contentStyle={styles.content}
    labelStyle={styles.label}
    icon={() => <IconButton icon={() => <Icon label={label} active={true} />}
      style={styles.icon} />}
  >
    {label}
  </Button>
)

const styles = StyleSheet.create({
  content: {
    marginLeft: -12,
    backgroundColor: '#8C8AFA',
    borderRadius: 100,
  },
  icon: {
    backgroundColor: "#AFADFC",
    borderRadius: 100,
    margin: 0,
  },
  label: {
    fontSize: 16,
    paddingRight: 8,
    color: '#FFF'
  },
})

export default AppbarButton;