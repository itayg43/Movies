import React from 'react';
import {StyleSheet, ScrollView, StyleProp, ViewStyle} from 'react-native';
import {Chip} from 'react-native-paper';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  values: string[];
};

const Genres = ({contentContainerStyle, values}: Props) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={[styles.container, contentContainerStyle]}
      showsHorizontalScrollIndicator={false}>
      {values.map(v => (
        <Chip key={v}>{v}</Chip>
      ))}
    </ScrollView>
  );
};

export default Genres;

const styles = StyleSheet.create({
  container: {
    columnGap: 5,
  },
});
