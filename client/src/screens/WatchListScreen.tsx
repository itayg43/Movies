import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectWatchList} from '../redux/watchList/watchListSlice';
import SafeView from '../components/SafeView';
import WatchListItem from '../components/WatchListItem';

const WatchListScreen = () => {
  const watchList = useAppSelector(selectWatchList);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <FlatList
        data={watchList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <WatchListItem item={item} />}
      />
    </SafeView>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
