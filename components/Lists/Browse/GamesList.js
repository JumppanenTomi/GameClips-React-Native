import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';

// Data is from the RAWG API: https://rawg.io/apidocs

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const idSet = new Set();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?platforms=4&ordering=-added&page_size=150&page=${page}&key=6411c4fb4f4340ad87976cbfecd8158c`
        );
        const data = response.data.results;
        setGames((prevGames) => [...prevGames, ...data]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGames();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?search=${searchTerm}&key=6411c4fb4f4340ad87976cbfecd8158c`
      );
      const data = response.data.results;
      if (data.length > 0) {
        setGames((prevGames) => [...prevGames, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    if (term.length === 0) {
      // Clearing the search bar should return the items to their original order. If the search bar is cleared too fast this won't work.
      setPage(1);
      setGames([]);
      idSet.clear();
    } else {
      handleSearch();
    }
  };

  // Ensure all items have a unique ID
  const filteredGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((game) => {
      if (!game.id) return true;
      if (!idSet.has(game.id)) {
        idSet.add(game.id);
        return true;
      }
      return false;
    });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search games..."
        placeholderTextColor="#FFF"
        onChangeText={handleSearchTermChange}
        value={searchTerm}
      />
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.game}>
            <Image source={{uri: item.background_image}} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
          </View>
        )}
        onEndReached={handleLoadMore} // Call handleLoadMore when the user reaches the end of the list
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
    width: '100%',
    paddingBottom: 100,
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
