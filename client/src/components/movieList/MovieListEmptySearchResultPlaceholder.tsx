import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type Props = {
  searchQuery: string;
};

const MovieListEmptySearchResultPlaceholder = ({searchQuery}: Props) => {
  return (
    <View style={styles.container}>
      {searchQuery !== '' && <Text>No search results.</Text>}
    </View>
  );
};

export default MovieListEmptySearchResultPlaceholder;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
