import React, {ReactNode} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

interface Props {
  children: ReactNode;
}

const SafeView = ({children}: Props) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default SafeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
