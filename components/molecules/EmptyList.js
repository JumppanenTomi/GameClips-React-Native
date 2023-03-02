import { View } from 'react-native';
import Text from 'components/atoms/Text';

const EmptyList = () => {
    return (
        <View style={{justifyContent: 'center', flex: 1, height: 320, alignItems: 'center'}}>
            <Text type="heading">No data found!</Text>
        </View>
    );
}

export default EmptyList;