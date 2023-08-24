import React from 'react';
import {Card, Text} from 'react-native-paper';

import {Movie} from '../types';

const THUMBNAIL_BASR_URL = 'https://image.tmdb.org/t/p/w500';

type Props = {
  item: Movie;
};

const MovieListItem = ({item}: Props) => {
  return (
    <Card mode="outlined">
      <Card.Cover
        source={{uri: `${THUMBNAIL_BASR_URL}/${item.backdropPath}`}}
      />

      <Card.Title title={item.title} titleStyle={{fontWeight: 'bold'}} />

      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={3}>
          {item.overview}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default MovieListItem;
