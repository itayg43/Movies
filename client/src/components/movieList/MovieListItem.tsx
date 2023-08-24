import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';

import {Movie} from '../../types';

const THUMBNAIL_BASR_URL = 'https://image.tmdb.org/t/p/w500';

type Props = {
  item: Movie;
  onPress: () => void;
};

const MovieListItem = ({item, onPress}: Props) => {
  return (
    <Card mode="outlined" onPress={onPress}>
      <Card.Cover source={{uri: `${THUMBNAIL_BASR_URL}${item.backdropPath}`}} />

      <Card.Title title={item.title} titleStyle={styles.title} />

      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={3}>
          {item.overview}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});
