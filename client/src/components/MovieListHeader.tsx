import React from 'react';
import {StyleProp, ViewStyle, View} from 'react-native';
import {Searchbar} from 'react-native-paper';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
};

const MovieListHeader = ({
  contentContainerStyle,
  searchQuery,
  onSearchQueryChange,
}: Props) => {
  return (
    <View style={contentContainerStyle}>
      <Searchbar
        mode="view"
        placeholder="Search"
        value={searchQuery}
        onChangeText={onSearchQueryChange}
      />
    </View>
  );
};

export default MovieListHeader;
