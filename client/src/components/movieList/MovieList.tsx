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
  horizontal?: boolean | undefined;
};

const MovieList = ({
  contentContainerStyle,
  data,
  onPress,
  listHeaderComponent,
  listEmptyComponent,
  horizontal,
}: Props) => {
  return (
    <View style={contentContainerStyle}>
      <FlatList
        horizontal={horizontal}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MovieListItem
            item={item}
            onPress={() => onPress(item.id)}
            horizontal={horizontal}
          />
        )}
        initialNumToRender={3}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={horizontal ? RightSideSpacer : BottomSpacer}
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

function RightSideSpacer() {
  return <View style={styles.rightSideSpacerContainer} />;
}

const styles = StyleSheet.create({
  bottomSpacerContainer: {
    marginBottom: 10,
  },

  rightSideSpacerContainer: {
    marginRight: 10,
  },
});
