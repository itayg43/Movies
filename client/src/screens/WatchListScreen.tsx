import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectWatchList} from '../redux/watchList/watchListSelectors';
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
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
      />
    </SafeView>
  );
};

function ListItemSeparator() {
  return <View style={styles.marginBottomSpacer} />;
}

function ListFooter() {
  return <View style={styles.marginBottomSpacer} />;
}

export default WatchListScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

  marginBottomSpacer: {
    marginBottom: 10,
  },
});
