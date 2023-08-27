import React, {useState, useEffect} from 'react';
import {StyleProp, ViewStyle, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useDebounce} from '../../hooks';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  onSearchQueryChange: (value: string) => void;
};

const MovieListSearchBarHeader = ({
  contentContainerStyle,
  onSearchQueryChange,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    onSearchQueryChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearchQueryChange]);

  return (
    <View style={contentContainerStyle}>
      <Searchbar
        mode="bar"
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default MovieListSearchBarHeader;
