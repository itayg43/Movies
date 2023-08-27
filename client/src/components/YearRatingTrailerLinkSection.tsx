import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Rating from './Rating';

type Props = {
  year: number;
  rating: number;
  trailerLink?: string | undefined | null;
};

const YearRatingTrailerLinkSection = ({year, rating, trailerLink}: Props) => {
  const handleTrailerLinkPress = () => {
    if (trailerLink) {
      Linking.openURL(trailerLink);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.year}>{year}</Text>

      <MaterialCommunityIcons name="dots-vertical" />

      <Rating value={rating} />

      {trailerLink && (
        <>
          <MaterialCommunityIcons name="dots-vertical" />

          <TouchableOpacity onPress={handleTrailerLinkPress}>
            <MaterialCommunityIcons name="youtube" color="red" size={20} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default YearRatingTrailerLinkSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },

  year: {
    color: 'gray',
  },
});
