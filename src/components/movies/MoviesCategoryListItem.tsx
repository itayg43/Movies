import React, {useCallback} from 'react';
import {StyleSheet, View, ImageBackground, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Movie} from '../../entities/Movie';
import {BaseURL} from '../../clients/tmdbClient';
import {MoviesScreenNavigationProp} from '../../navigation/MoviesStackNavigator';

interface Props {
  item: Movie;
  isLargeImage?: boolean;
}

const MoviesCategoryListItem = ({item, isLargeImage = false}: Props) => {
  const navigation = useNavigation<MoviesScreenNavigationProp>();

  const handleSelection = useCallback(() => {
    navigation.navigate('movieDetailsScreen', {
      id: item.mid ?? 0,
    });
  }, [navigation]);

  return (
    <Pressable onPress={handleSelection}>
      <ImageBackground
        style={[styles.image, isLargeImage && {height: 400}]}
        source={{
          uri: `${isLargeImage ? BaseURL.originalImage : BaseURL.resizedImage}${
            item.posterURL
          }`,
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
    </Pressable>
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
