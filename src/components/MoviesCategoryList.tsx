import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import {Movie} from '../entities/Movie';
import MoviesCategoryListItem from './MoviesCategoryListItem';

interface Props {
  category: string;
  entities: Movie[];
  isLargeImages?: boolean;
}

const MoviesCategoryList = ({
  category,
  entities,
  isLargeImages = false,
}: Props) => {
  return (
    <View style={styles.container}>
      {/** category */}
      <Text style={styles.category}>{category}</Text>

      {/** list */}
      <FlatList
        data={entities}
        renderItem={({item}) => (
          <MoviesCategoryListItem item={item} isLargeImage={isLargeImages} />
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={2}
      />
    </View>
  );
};

export default MoviesCategoryList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  category: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
