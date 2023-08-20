import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import {useAppDispatch} from '../hooks';
import authActions from '../redux/auth/authActions';
import SafeView from '../components/SafeView';

const MoviesScreen = () => {
  const dispatch = useAppDispatch();

  const handleLogoutPress = useCallback(async () => {
    dispatch(authActions.logoutUser());
  }, [dispatch]);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <Button onPress={handleLogoutPress}>Logout</Button>
    </SafeView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
