import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';

import {Movie} from '../entities/Movie';
import MoviesSearchResultsListItem from './MoviesSearchResultsListItem';

interface Props {
  results: Movie[];
}

const MoviesSearchResultsList = ({results}: Props) => {
  return (
    <>
      {/** empty results */}
      {results.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text>No Results!</Text>
        </View>
      )}

      {results.length > 0 && (
        <View style={styles.container}>
          <FlatList
            data={results}
            renderItem={({item}) => <MoviesSearchResultsListItem item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
          />
        </View>
      )}
    </>
  );
};

export default MoviesSearchResultsList;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

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
