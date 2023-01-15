import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  value: string;
}

const Chip = ({value}: Props) => {
  return (
    <View style={styles.container}>
      <Text>{value}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginEnd: 3,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
