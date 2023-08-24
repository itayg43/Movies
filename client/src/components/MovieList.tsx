import React from 'react';
import {FlatList, View, StyleProp, ViewStyle} from 'react-native';

import {Movie} from '../types';
import MovieListItem from './MovieListItem';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  data: Movie[];
  listHeaderComponent?: React.ReactElement;
};

const MovieList = ({
  contentContainerStyle,
  data,
  listHeaderComponent,
}: Props) => {
  return (
    <View style={contentContainerStyle}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <MovieListItem item={item} />}
        initialNumToRender={3}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={BottomSpacer}
        ListFooterComponent={BottomSpacer}
      />
    </View>
  );
};

export default MovieList;

function BottomSpacer() {
  return <View style={{marginBottom: 10}} />;
}
