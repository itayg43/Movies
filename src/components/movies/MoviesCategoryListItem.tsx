import React from 'react';
import {StyleSheet, View, ImageBackground, Text} from 'react-native';

import {Movie} from '../../entities/Movie';
import {BaseURL} from '../../clients/tmdbClient';

interface Props {
  item: Movie;
  isLargeImage?: boolean;
}

const MoviesCategoryListItem = ({item, isLargeImage = false}: Props) => {
  return (
    <ImageBackground
      style={[styles.image, isLargeImage && {height: 400}]}
      source={{
        uri: `${BaseURL.image}${item.posterURL}`,
      }}>
      {/** details */}
      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        {/** year */}
        <Text style={styles.year}>{item.getReleaseYear()}</Text>
      </View>
    </ImageBackground>
  );
};

export default MoviesCategoryListItem;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    marginEnd: 10,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  detailsContainer: {
    padding: 10,
    backgroundColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
  },
  year: {
    marginTop: 5,
    color: 'gray',
  },
});
