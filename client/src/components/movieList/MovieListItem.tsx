import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';

import {Movie} from '../../types';

type Props = {
  item: Movie;
  onPress: () => void;
};

const MovieListItem = ({item, onPress}: Props) => {
  return (
    <Card mode="outlined" onPress={onPress}>
      <Card.Cover source={{uri: item.backdropUrl}} />

      <Card.Title title={item.title} titleStyle={styles.title} />

      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={2}>
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
