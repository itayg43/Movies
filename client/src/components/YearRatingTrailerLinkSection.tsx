import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  trailerLink?: string | undefined | null;
};

const YearRatingTrailerLinkSection = ({
  releaseDate,
  voteAverage,
  voteCount,
  trailerLink,
}: Props) => {
  return (
    <View style={styles.container}>
      {/** year */}
      {releaseDate !== '' && (
        <Text style={styles.year}>{new Date(releaseDate).getFullYear()}</Text>
      )}

      {/** rating */}
      {voteCount > 0 && (
        <>
          <MaterialCommunityIcons name="dots-vertical" />

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{voteAverage.toFixed(1)}</Text>

            <MaterialCommunityIcons name="star" color="orange" />

            <Text style={styles.ratingsCount}>({voteCount})</Text>
          </View>
        </>
      )}

      {trailerLink && (
        <>
          <MaterialCommunityIcons name="dots-vertical" />

          <TouchableOpacity onPress={() => Linking.openURL(trailerLink)}>
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

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  rating: {
    color: 'gray',
  },
  ratingsCount: {
    color: 'gray',
    fontSize: 12,
  },
});
