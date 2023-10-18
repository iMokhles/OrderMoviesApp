import {useGetMovieQuery} from '@api/TMDB';
import AppLayout from '@components/AppLayout';
import BackButton from '@components/BackButton';
import Poster from '@components/Poster';
import {getImageUrl} from '@helpers/AppHelper';
import {IMovie, IMovieDetails} from '@rredux/Reducers/configs/types';
import {Star, User} from '@tamagui/lucide-icons';
import {getScaleSizeWidth} from '@utils/ScalingUtils';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Else, If, Then} from 'react-if';
import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Image, ScrollView, Spinner, Text, View} from 'tamagui';

const BACKDROP_ASPECT_RATIO = getScaleSizeWidth(16) / getScaleSizeWidth(9);
const KEY_EXTRACTOR = (item: IMovie) => String(item.id);
const LINEAR_GRADIENT_COLORS = ['#14151A00', '#14151A'];

const DetailsScreen: FC<any> = ({route}: {route: any}) => {
  const {item: movie} = route.params;
  const {data, isLoading, error, isError} = useGetMovieQuery(movie?.id);

  const [movieDetails, setMovieDetails] = useState<IMovieDetails | undefined>(
    undefined,
  );

  const {width} = useWindowDimensions();

  useEffect(() => {
    //
    if (data && !isError) {
      setMovieDetails(data);
    }
  }, [data, isError]);
  const backdropSource = useMemo(
    () => ({
      uri: getImageUrl({size: 'w780', path: movieDetails?.backdrop_path}),
    }),
    [movieDetails?.backdrop_path],
  );

  const backdropStyles = useMemo(
    () => ({
      width,
      height: width / BACKDROP_ASPECT_RATIO,
      opacity: 0.8,
    }),
    [width],
  );

  const linearGradientStyles = useMemo(
    () => ({
      width,
      position: 'absolute',
      bottom: 0,
      height: getScaleSizeWidth(120),
    }),
    [width],
  );

  const _renderCover = () => {
    return (
      <View>
        <Image source={backdropSource} style={backdropStyles} />
        <LinearGradient
          colors={LINEAR_GRADIENT_COLORS}
          style={linearGradientStyles}
        />
        <View style={styles.goBackContainer}>
          <BackButton />
        </View>
        <View
          position={'absolute'}
          top={width / BACKDROP_ASPECT_RATIO / getScaleSizeWidth(1.5)}
          left={getScaleSizeWidth(16)}>
          <Poster
            posterPath={movieDetails?.poster_path}
            size="w500"
            width={getScaleSizeWidth(100)}
          />
        </View>
      </View>
    );
  };

  const _renderTopDetails = () => {
    return (
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle} numberOfLines={3}>
            {movieDetails?.title}
          </Text>
          <Text style={styles.dateAndTime} numberOfLines={3}>
            {movieDetails?.release_date} - {movieDetails?.runtime || '-'}
            min
          </Text>
          <View style={styles.ragingContainer}>
            <Text style={styles.rating}>
              <Star
                fill={'orange'}
                color={'$colorTransparent'}
                size={getScaleSizeWidth(25)}
              />
            </Text>
            <Text style={styles.rating}>{movieDetails?.vote_average}</Text>
            <Text style={styles.voters}>{movieDetails?.vote_count} votes</Text>
          </View>
        </View>
      </View>
    );
  };
  const _renderBody = () => {
    return (
      <View style={styles.body}>
        <Text style={styles.bodyTitle}>Synopsis</Text>
        <Text style={styles.bodyText}>{movieDetails?.overview}</Text>
        <Text style={styles.bodyTitle}>Credits</Text>
      </View>
    );
  };

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.profileContainer}>
        <View style={styles.profileAvatarContainer}>
          <User size={getScaleSizeWidth(45)} color={'white'} />
          <Image
            source={{uri: getImageUrl({path: item.profile_path, size: 'w185'})}}
            style={styles.profileAvatar}
          />
        </View>
        <Text style={styles.creditName} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    ),
    [],
  );

  const _renderCredits = () => {
    return (
      <FlatList
        data={movieDetails?.credits?.cast.slice(0, 10)}
        renderItem={renderItem}
        removeClippedSubviews
        keyExtractor={KEY_EXTRACTOR}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  };
  const _renderContent = () => {
    if (!movieDetails) {
      return null;
    }

    return (
      <ScrollView>
        {_renderCover()}
        {_renderTopDetails()}
        {_renderBody()}
        {_renderCredits()}
      </ScrollView>
    );
  };
  return (
    <AppLayout hasSafeArea edges={['bottom', 'left', 'right']}>
      <If condition={isLoading}>
        <Then>
          <View flex={1} justifyContent={'center'} alignItems={'center'}>
            <Spinner size="large" color="$red11" />
          </View>
        </Then>
        <Else>
          <If condition={error != null}>
            <Then>
              <Text fontWeight={'700'}>{error?.data?.status_message}</Text>
            </Then>
            <Else>{_renderContent()}</Else>
          </If>
        </Else>
      </If>
    </AppLayout>
  );
};
export default DetailsScreen;

const styles = StyleSheet.create({
  goBackContainer: {
    position: 'absolute',
    top: getScaleSizeWidth(40),
    marginLeft: getScaleSizeWidth(16),
  },
  header: {
    marginTop: getScaleSizeWidth(5),
    marginHorizontal: getScaleSizeWidth(110),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: getScaleSizeWidth(16),
  },
  movieTitle: {
    color: 'black',
    fontSize: getScaleSizeWidth(17),
    fontWeight: 'bold',
  },
  dateAndTime: {
    color: 'black',
  },
  rating: {
    color: 'orange',
    fontSize: getScaleSizeWidth(17),
  },
  ragingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voters: {
    marginLeft: getScaleSizeWidth(8),
    color: 'orange',
  },
  body: {
    padding: getScaleSizeWidth(17),
  },
  bodyTitle: {
    marginTop: getScaleSizeWidth(16),
    color: 'black',
    fontSize: getScaleSizeWidth(20),
    fontWeight: 'bold',
  },
  bodyText: {
    marginTop: getScaleSizeWidth(5),
    color: 'grey',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: getScaleSizeWidth(130),
    paddingHorizontal: getScaleSizeWidth(16),
  },
  profileAvatar: {
    height: getScaleSizeWidth(80),
    width: getScaleSizeWidth(80),
    borderRadius: getScaleSizeWidth(80) / 2,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  profileAvatarContainer: {
    height: getScaleSizeWidth(80),
    width: getScaleSizeWidth(80),
    borderRadius: getScaleSizeWidth(80) / 2,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditName: {
    marginTop: getScaleSizeWidth(16),
    color: 'black',
    textAlign: 'center',
  },
});
