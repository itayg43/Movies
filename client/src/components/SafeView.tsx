import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const SafeView = ({contentContainerStyle, children}: Props) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeView;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
