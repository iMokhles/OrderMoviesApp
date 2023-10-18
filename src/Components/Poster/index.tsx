import {getImageUrl} from '@helpers/AppHelper';
import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Text} from 'tamagui';

interface PosterProps {
  index?: number;
  showIndex?: boolean;
  size?: string;
  onPress?: any;
  posterPath?: string;
  width?: number;
}

const Poster = (props: PosterProps) => {
  const {
    index,
    showIndex,
    size = 'w500',
    onPress,
    posterPath,
    width = 100,
  } = props;

  const imageSource = useMemo(
    () => ({
      uri: getImageUrl({path: posterPath, size}),
    }),
    [],
  );

  const height = useMemo(() => width / (2 / 3), [width]);

  const coverStyles = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  );

  const coverContainerStyles = useMemo(
    () => ({
      ...styles.coverContainer,
      ...coverStyles,
    }),
    [coverStyles],
  );

  const _renderContent = () => {
    return useMemo(
      () => (
        <TouchableOpacity onPress={onPress}>
          <View style={coverContainerStyles}>
            <Image source={imageSource} style={coverStyles} />

            {showIndex ? (
              <View style={styles.indexIndicator}>
                <Text style={styles.indexText}>{index + 1}</Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      ),
      [],
    );
  };
  return _renderContent();
};

export default Poster;

const styles = StyleSheet.create({
  indexIndicator: {
    padding: 2,
    width: 25,
    textAlign: 'center',
    position: 'absolute',
    top: 8,
    left: 0,
    backgroundColor: '#ffffffaa',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  indexText: {
    textAlign: 'center',
    fontSize: 12,
  },
  coverContainer: {
    backgroundColor: '#1C1D24',
    borderRadius: 4,
    overflow: 'hidden',
  },
});
