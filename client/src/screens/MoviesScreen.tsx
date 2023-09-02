import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import {Chip} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Movie, MoviesCategory} from '../types';
import moviesService from '../services/moviesService';
import SafeView from '../components/SafeView';

const CATEGORIES: MoviesCategory[] = [
  {
    id: '0',
    key: 'Now Playing',
    value: 'now_playing',
  },
  {
    id: '1',
    key: 'Popular',
    value: 'popular',
  },
  {
    id: '2',
    key: 'Top Rated',
    value: 'top_rated',
  },
  {
    id: '3',
    key: 'Upcoming',
    value: 'upcoming',
  },
];

const MoviesScreen = () => {
  const [category, setCategory] = useState<MoviesCategory>(CATEGORIES[0]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleGetMoviesByCategory = useCallback(async (c: MoviesCategory) => {
    try {
      setMovies(await moviesService.getMoviesByCategory(c));
    } catch (error) {}
  }, []);

  useEffect(() => {
    handleGetMoviesByCategory(category);
  }, [handleGetMoviesByCategory, category]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      {/** categories */}
      <ScrollView
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(c => (
          <Chip
            key={c.id}
            selected={c === category}
            onPress={() => setCategory(c)}>
            {c.key}
          </Chip>
        ))}
      </ScrollView>

      {/** movie list */}
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Pressable style={styles.listItemContainer}>
            {/** image */}
            <Image
              style={styles.image}
              source={{uri: item.backdropUrl ?? item.posterUrl}}
            />

            {/** details */}
            <View style={styles.detailsContainer}>
              {/** title */}
              <Text style={styles.title}>{item.title}</Text>

              {/** year & rating */}
              <View style={styles.yearAndRatingContainer}>
                {/** year */}
                <Text style={styles.year}>
                  {new Date(item.releaseDate).getFullYear()}
                </Text>

                <MaterialCommunityIcons name="dots-vertical" />

                {/** rating */}
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>
                    {item.voteAverage.toFixed(1)}
                  </Text>

                  <MaterialCommunityIcons name="star" color="orange" />

                  {/** vote count */}
                  <Text style={styles.voteCount}>({item.voteCount})</Text>
                </View>
              </View>

              {/** overview */}
              <Text numberOfLines={2}>{item.overview}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
      />
    </SafeView>
  );
};

function ListItemSeparator() {
  return <View style={styles.marginBottomSpacer} />;
}

function ListFooter() {
  return <View style={styles.marginBottomSpacer} />;
}

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    marginHorizontal: 10,
  },

  categoriesContainer: {
    flexGrow: 0,
  },
  categoriesContentContainer: {
    columnGap: 5,
  },

  listItemContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '65%',
  },
  detailsContainer: {
    padding: 10,
    rowGap: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  yearAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  year: {
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
  },
  rating: {
    color: 'gray',
  },
  voteCount: {
    fontSize: 12,
  },

  marginBottomSpacer: {
    marginBottom: 10,
  },
});
