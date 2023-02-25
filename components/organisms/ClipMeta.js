import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "hooks/ApiHooks";
import { StyleSheet, View } from "react-native";
import Text from "components/atoms/Text";

const ClipMeta = ({ userId, title, description }) => {
  const [owner, setOwner] = useState('');
  const { getUserById } = useUser();

  useEffect(() => {
    const getOwner = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const result = await getUserById(token, userId);
        setOwner(result.username);
      } catch (error) {
        console.log(error);
      }
    }
    getOwner();
  }, [])

  return (
    <View style={styles.container}>
      <Text type="brightSubHeading" style={{ fontSize: 16, fontWeight: '700' }}>
        @{owner}
      </Text>
      <Text type="brightSubHeading" style={{ fontSize: 18 }}>
        {title}
      </Text>
      <Text style={{ color: '#fff' }}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 90,
    width: '100%',
    paddingHorizontal: 8,
  }
})

export default ClipMeta;