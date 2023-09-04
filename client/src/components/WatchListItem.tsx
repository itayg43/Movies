import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {WatchList} from '../types';

type Props = {
  item: WatchList;
};

const WatchListItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.movie.backdropUrl,
        }}
      />

      {/** details */}
      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title}>{item.movie.title}</Text>

        {/** overview */}
        <Text numberOfLines={2}>{item.movie.overview}</Text>

        <Text style={styles.addedOn}>
          Added On: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default WatchListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    columnGap: 10,
    borderRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    rowGap: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  addedOn: {
    fontSize: 12,
    color: 'gray',
  },
});
