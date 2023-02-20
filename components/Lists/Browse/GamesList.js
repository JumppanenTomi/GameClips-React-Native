import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

// Data is from the RAWG API: https://rawg.io/apidocs

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          'https://api.rawg.io/api/games?platforms=4&ordering=-added&page_size=150&key=6411c4fb4f4340ad87976cbfecd8158c'
        );
        setGames(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGames();
  }, []);

  const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search games..."
        placeholderTextColor="#FFF"
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.game}>
            <Image source={{ uri: item.background_image }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
    width: '100%',
  },
  game: {
    margin: 10,
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: 5,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: '#25253B',
    color: '#fff',
  },
});

export default GamesList;
