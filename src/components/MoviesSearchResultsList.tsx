import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {Movie} from '../entities/Movie';
import MoviesSearchResultsListItem from './MoviesSearchResultsListItem';

interface Props {
  results: Movie[];
}

const MoviesSearchResultsList = ({results}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={({item}) => <MoviesSearchResultsListItem item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
};

export default MoviesSearchResultsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
