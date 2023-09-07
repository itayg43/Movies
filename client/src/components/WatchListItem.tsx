import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {WatchList} from '../types';

type Props = {
  item: WatchList;
  onPress: () => void;
};

const WatchListItem = ({item, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.movie.backdropUrl,
        }}
      />

      {/** details */}
      <View style={styles.detailsContainer}>
        {/** title */}
        <Text style={styles.title} numberOfLines={1}>
          {item.movie.title}
        </Text>

        {/** overview */}
        <Text numberOfLines={2}>{item.movie.overview}</Text>

        <Text style={styles.addedOn}>
          Added On: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: '#ccc',
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
