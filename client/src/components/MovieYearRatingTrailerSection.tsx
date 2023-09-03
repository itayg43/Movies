import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  trailerUrl?: string | null;
};

const MovieYearRatingTrailerSection = ({
  releaseDate,
  voteAverage,
  voteCount,
  trailerUrl,
}: Props) => {
  const handleTrailerLinkPress = async () => {
    try {
      if (!trailerUrl) {
        return;
      }

      await Linking.openURL(trailerUrl);
    } catch (error) {
      Alert.alert('Error', "Can't open trailer link");
    }
  };

  return (
    <View style={styles.container}>
      {/** year */}
      <Text style={styles.year}>{new Date(releaseDate).getFullYear()}</Text>

      {/** spacer */}
      <MaterialCommunityIcons name="dots-vertical" />

      {/** rating */}
      <View style={styles.ratingContainer}>
        {/** value */}
        <Text style={styles.rating}>{voteAverage.toFixed(1)}</Text>

        {/** star */}
        <MaterialCommunityIcons name="star" color="orange" />

        {/** ratings count */}
        <Text style={styles.ratingsCount}>({voteCount})</Text>
      </View>

      {trailerUrl && (
        <>
          {/** spacer */}
          <MaterialCommunityIcons name="dots-vertical" />

          <TouchableOpacity onPress={handleTrailerLinkPress}>
            <MaterialCommunityIcons name="youtube" size={22} color="red" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default MovieYearRatingTrailerSection;

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
    columnGap: 2,
  },
  rating: {
    color: 'gray',
  },
  ratingsCount: {
    fontSize: 12,
  },
});
