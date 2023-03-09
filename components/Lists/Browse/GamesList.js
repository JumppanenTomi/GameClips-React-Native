import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useGame} from 'hooks/useGame';
import {useDebounce} from 'hooks/useDebounce';
import GameCard from 'components/organisms/GameCard';
import Loader from 'components/atoms/Loader';
import Searchbar from 'components/atoms/Searchbar';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import ClipList from 'views/ClipList';

// Data is from the RAWG API: https://rawg.io/apidocs

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [query, setQuery] = useState({page: 1, search: ''});
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 400);
  const {getListGame} = useGame();
  const idSet = new Set();

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await getListGame(query);
        setGames((prevGames) => [...prevGames, ...response.results]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [query]);

  useEffect(() => {
    setGames([]);
    setQuery({search: debouncedInput, page: 1});
  }, [debouncedInput]);

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      setQuery((prevQuery) => ({...prevQuery, page: prevQuery.page + 1}));
    }
  };

  const handleSearch = (newQuery) => {
      setInput(newQuery);
  };

  const handleGamePress = (game) => {
    navigation.navigate('BrowseClipList', {gameName: game});
  };

  const filteredGames = games.filter((game) => {
    if (!game.id) return true;
    if (!idSet.has(game.id)) {
      idSet.add(game.id);
      return true;
    }
    return false;
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text type="heading" style={{fontSize: 24}}>
          Browse
        </Text>
        <Separator height={16} />
        <Searchbar value={input} onChangeText={handleSearch} />
      </View>
      <Separator height={18} />
      <View style={styles.mainContainer}>
        {loading && (
          <View>
            <Loader />
            <Separator height={18} />
          </View>
        )}
        <FlatList
          data={filteredGames}
          keyExtractor={(item, index) => item.id.toString() + index}
          numColumns={2}
          renderItem={({item, index}) => (
            <GameCard
              game={item}
              onPress={() => {
                handleGamePress(item.name);
              }}
            />
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
    paddingHorizontal: 24,
  },
  mainContainer: {
    paddingHorizontal: 18,
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
    transform: [{scale: 0.9}],
  },
  selectedItem: {
    transform: [{scale: 0.9}],
  },
});

export default GamesList;
