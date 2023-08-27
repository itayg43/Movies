import React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  value: number;
};

const Rating = ({contentContainerStyle, value}: Props) => {
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <Text style={styles.value}>{value.toFixed(1)}</Text>

      <MaterialCommunityIcons name="star" color="orange" />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  value: {
    color: 'gray',
  },
});
