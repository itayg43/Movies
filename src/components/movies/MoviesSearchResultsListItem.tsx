import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Movie} from '../../entities/Movie';
import {BaseURL} from '../../clients/tmdbClient';
import {MoviesScreenNavigationProp} from '../../navigation/MoviesStackNavigator';

interface Props {
  item: Movie;
}

const MoviesSearchResultsListItem = ({item}: Props) => {
  const navigation = useNavigation<MoviesScreenNavigationProp>();

  const handleSelection = useCallback(() => {
    navigation.navigate('movieDetailsScreen', {
      id: item.mid ?? 0,
    });
  }, [navigation]);

  return (
    <Pressable onPress={handleSelection}>
      <View style={styles.container}>
        {/** image */}
        <Image
          style={styles.image}
          source={{uri: `${BaseURL.resizedImage}${item.posterURL}`}}
        />

        {/** details */}
        <View style={styles.detailsContainer}>
          {/** title */}
          <Text style={styles.title}>{item.title}</Text>

          {/** year */}
          <Text style={styles.year}>{item.getReleaseYear()}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MoviesSearchResultsListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  image: {
    width: 70,
    height: '100%',
  },

  detailsContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  year: {
    color: 'gray',
  },
});
