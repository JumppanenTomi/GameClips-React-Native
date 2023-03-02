import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GameCard from 'components/organisms/GameCard';
import { useIsFocused } from '@react-navigation/native'
import useGame from 'hooks/useGame';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'hooks/useDebounce';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import Icon from 'components/atoms/Icon';

// Data is from the RAWG API: https://rawg.io/apidocs

const GamesList = () => {
  const isFocused = useIsFocused();
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);;
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const searchQuery = useDebounce(query, 1000)
  const { getListGame } = useGame();

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await getListGame(page, searchQuery);
        setGames((prevGames) => [...prevGames, ...response.results]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [page, searchQuery]);

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleGamePress = (index) => {
    navigation.navigate('ClipList');
  };

  const handleSearch = newQuery => {
    console.log("The new query is ", newQuery);
    setGames([]);
    setPage(1);
    setQuery(newQuery);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text type="heading" style={{ fontSize: 24 }}>Browse</Text>
        <Separator height={16} />
        <Searchbar
          icon={() => <Icon label="search" size={16} color="rgba(255,255,255,0.5)" />}
          style={{ backgroundColor: '#0D0D25', borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', height: 46 }}
          inputStyle={{ fontSize: 14, paddingLeft: 0, color: 'white' }}
          placeholder="Search"
          placeholderTextColor={"rgba(255,255,255,0.5)"}
          onChangeText={handleSearch}
          value={query}
        />
      </View>
      <Separator height={18} />
      <View style={styles.mainContainer}>
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item, index }) => (
            <GameCard game={item} />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D25',
    width: '100%',
    paddingBottom: 100,
    paddingTop: 50,
  },
  headerContainer: {
    paddingHorizontal: 24
  },
  mainContainer: {
    paddingHorizontal: 18
  },
  game: {
    margin: 10,
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },

  title: {
    marginTop: 5,
    textAlign: 'center',
  },
  selectedGame: {
    transform: [{ scale: 0.9 }],
  },
  selectedItem: {
    transform: [{ scale: 0.9 }],
  },
});

export default GamesList;
