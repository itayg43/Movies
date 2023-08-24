import React from 'react';
import {StyleSheet, FlatList, View, StyleProp, ViewStyle} from 'react-native';

import {Movie} from '../../types';
import MovieListItem from './MovieListItem';

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  data: Movie[];
  onPress: (id: number) => void;
  listHeaderComponent?: React.ReactElement;
  listEmptyComponent?: React.ReactElement;
};

const MovieList = ({
  contentContainerStyle,
  data,
  onPress,
  listHeaderComponent,
  listEmptyComponent,
}: Props) => {
  return (
    <View style={contentContainerStyle}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MovieListItem item={item} onPress={() => onPress(item.id)} />
        )}
        initialNumToRender={3}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={BottomSpacer}
        ListFooterComponent={BottomSpacer}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};

export default MovieList;

function BottomSpacer() {
  return <View style={styles.bottomSpacerContainer} />;
}

const styles = StyleSheet.create({
  bottomSpacerContainer: {
    marginBottom: 10,
  },
});
