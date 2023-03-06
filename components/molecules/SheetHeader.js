import PropTypes from 'prop-types';
import { StyleSheet, View } from "react-native";
import Icon from 'components/atoms/Icon';
import Text from 'components/atoms/Text';

const SheetHeader = ({ count }) => (
  <View style={styles.container}>
    <Text type="body">
      Comments
    </Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon label="profile-fill" size={16} />
      <Text type="body" style={styles.textCount}>
        {count}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textCount: {
    color: 'rgba(255,255,255,0.5)',
    paddingLeft: 8,
  }
})

SheetHeader.propTypes = {
  count: PropTypes.number.isRequired
}

export default SheetHeader;