import React, {useState, useEffect} from 'react';
import {StyleProp, ViewStyle, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useDebounce, useIsFirstRender} from '../../hooks';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  onSearchQueryChange: (value: string) => void;
};

const MovieListSearchBarHeader = ({
  contentContainerStyle,
  onSearchQueryChange,
}: Props) => {
  const isFirstRender = useIsFirstRender();

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    onSearchQueryChange(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

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
