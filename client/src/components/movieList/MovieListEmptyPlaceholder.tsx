import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type Props = {
  searchQuery: string;
};

const MovieListEmptyPlaceholder = ({searchQuery}: Props) => {
  return (
    <View style={styles.container}>
      {searchQuery !== '' && <Text>No results for: {searchQuery}</Text>}
    </View>
  );
};

export default MovieListEmptyPlaceholder;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
