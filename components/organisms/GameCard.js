import { StyleSheet, View, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Text from "components/atoms/Text";

const GameCard = ({ game }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground source={{ uri: game.background_image }} style={styles.background}>
        <LinearGradient colors={['transparent', 'transparent', 'rgba(0,0,0,0.8)']} style={styles.gradient}>
          <View style={styles.textContainer}>
            <Text type="meta">{game.name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    aspectRatio: 0.7, // To keep the aspect ratio of the card
    borderRadius: 15,
    overflow: 'hidden', // To clip the content that overflows the card
    maxWidth: '50%'
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // To make the image fill the card
    justifyContent: 'flex-end', // To align the text at the bottom of the card
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 24,
    paddingHorizontal: 8,
    alignItems: 'center',
  },

})

export default GameCard;