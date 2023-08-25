import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';

import {Movie} from '../../types';

type Props = {
  item: Movie;
  onPress: () => void;
  horizontal?: boolean | undefined;
};

const MovieListItem = ({item, onPress, horizontal}: Props) => {
  return (
    <Card
      contentStyle={horizontal ? styles.horizontalContainer : null}
      mode="outlined"
      onPress={onPress}>
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
  horizontalContainer: {
    width: 300,
    height: 300,
  },

  title: {
    fontWeight: 'bold',
  },
});
