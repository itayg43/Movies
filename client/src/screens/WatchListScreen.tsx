import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectWatchList} from '../redux/watchList/watchListSelectors';
import SafeView from '../components/SafeView';
import WatchListItem from '../components/WatchListItem';
import {WatchListScreenNavigationProp} from '../navigators/WatchListStackNavigator';

const WatchListScreen = () => {
  const navigation = useNavigation<WatchListScreenNavigationProp>();

  const watchList = useAppSelector(selectWatchList);

  const handleWatchListItemPress = (id: number) => {
    navigation.navigate('movieDetailsScreen', {
      id,
    });
  };

  return (
    <SafeView contentContainerStyle={styles.container}>
      <FlatList
        data={watchList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <WatchListItem
            item={item}
            onPress={() => handleWatchListItemPress(item.movie.id)}
          />
        )}
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
