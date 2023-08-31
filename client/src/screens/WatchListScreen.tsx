import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';

import {useAppDispatch, useAppSelector} from '../hooks';
import SafeView from '../components/SafeView';
import {
  selectWatchlist,
  selectWatchlistErrorMessage,
} from '../redux/watchlist/watchlistSelectors';
import {RequestStatus} from '../types';
import watchlistActions from '../redux/watchlist/watchlistActions';
import WatchlistItem from '../components/WatchlistItem';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

const WatchlistScreen = () => {
  const dispatch = useAppDispatch();

  const watchlist = useAppSelector(selectWatchlist);
  const watchlistErrorMessage = useAppSelector(selectWatchlistErrorMessage);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');

  const handleGetWatchlist = useCallback(async () => {
    try {
      setRequestStatus('loading');
      await dispatch(watchlistActions.getWatchlist()).unwrap();
      setRequestStatus('succeded');
    } catch (error) {
      setRequestStatus('failed');
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetWatchlist();
  }, [handleGetWatchlist]);

  return (
    <SafeView>
      {requestStatus === 'loading' && (
        <LoadingView message="Loading Watchlist..." />
      )}

      {requestStatus === 'succeded' && (
        <View style={styles.contentContainer}>
          <FlatList
            data={watchlist}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <WatchlistItem item={item} />}
            ItemSeparatorComponent={ListSpacer}
            ListFooterComponent={ListSpacer}
            ListEmptyComponent={EmptyListPlaceholder}
          />
        </View>
      )}

      {requestStatus === 'failed' && (
        <ErrorView
          message={watchlistErrorMessage}
          onTryAgain={handleGetWatchlist}
        />
      )}
    </SafeView>
  );
};

export default WatchlistScreen;

function ListSpacer() {
  return <View style={styles.listSpacerContainer} />;
}

function EmptyListPlaceholder() {
  return (
    <View style={styles.emptyListPlaceholderContainer}>
      <Text>No watchlist found.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: 5,
  },

  listSpacerContainer: {
    marginBottom: 10,
  },

  emptyListPlaceholderContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
});
