import {useGetPopularMoviesQuery} from '@api/TMDB';
import AppLayout from '@components/AppLayout';
import {NavRoutes} from '@constants/NavRoutes';
import {getImageUrl} from '@helpers/AppHelper';
import {push} from '@helpers/NavigatorHelper';
import {IMovie} from '@rredux/Reducers/configs/types';
import {getScaleSizeWidth} from '@utils/ScalingUtils';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {Else, If, Then} from 'react-if';
import {StyleSheet, RefreshControl} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {Card, Image, Spinner, Text, View} from 'tamagui';

const KEY_EXTRACTOR = (item: IMovie) => String(item.id);

const HomeScreen: FC = () => {
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [movieList, setMovieList] = useState<any>([]);

  const {data, error, isFetching, isLoading, isError} =
    useGetPopularMoviesQuery(page);

  useEffect(() => {
    if (data && !isError) {
      movieList[page - 1] = data?.results;
      setMovieList([...movieList]);
      if (data?.results?.length! < 20) {
        setEndReached(true);
      }
    }
  }, [data, isError]);

  const getMovieList = useMemo(() => {
    let list: IMovie[] = [];
    for (let i = 0; i < page; i++) {
      list = list.concat(movieList[i] || []);
    }
    return list;
  }, [movieList, page]);

  const loadMoreMovies = () => {
    if (endReached || isLoading || !getMovieList.length) {
      return;
    }
    setPage(page + 1);
  };

  const onRefresh = () => {
    setPage(1);
  };

  const renderFooter = () => {
    if (endReached) {
      return (
        <View style={styles.footerStyle}>
          <Text fontWeight={'700'} textAlign={'center'}>
            End reached
          </Text>
        </View>
      );
    }

    if (!isFetching) {
      return null;
    }

    return (
      <View style={styles.footerStyle}>
        <Spinner size="large" color="$red11" />
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <FlatGrid
        style={styles.flatGridStyle}
        itemContainerStyle={styles.flatGridItemContainerStyle}
        contentContainerStyle={styles.flatGridContainerStyle}
        spacing={getScaleSizeWidth(15)}
        itemDimension={getScaleSizeWidth(150) * 0.7}
        data={getMovieList}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter()}
        keyExtractor={KEY_EXTRACTOR}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={onRefresh}
            progressBackgroundColor={'hsl(358, 65.0%, 48.7%)'}
            tintColor={'hsl(358, 65.0%, 48.7%)'}
          />
        }
        renderItem={({item}: {item: IMovie}) => {
          return (
            <Card
              borderRadius={0}
              onPress={() => {
                push(NavRoutes.Details, {item});
              }}
              elevate
              width={getScaleSizeWidth(150) * 0.7}
              height={getScaleSizeWidth(225) * 0.7}>
              <Card.Footer>
                <Text
                  fontSize={getScaleSizeWidth(13)}
                  paddingHorizontal={getScaleSizeWidth(5)}
                  paddingVertical={getScaleSizeWidth(5)}
                  flex={1}
                  color={'white'}
                  backgroundColor={'rgba(0, 0, 0, 0.7)'}
                  numberOfLines={2}
                  textAlign={'center'}>
                  {item?.title}
                </Text>
              </Card.Footer>
              <Card.Background width={'100%'} height={'100%'}>
                <Image
                  width={'100%'}
                  height={'100%'}
                  resizeMode="cover"
                  alignSelf="center"
                  source={{
                    uri: getImageUrl({path: item?.poster_path}),
                  }}
                />
              </Card.Background>
            </Card>
          );
        }}
      />
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

export default HomeScreen;

const styles = StyleSheet.create({
  footerStyle: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  flatGridItemContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatGridContainerStyle: {
    justifyContent: 'center',
    paddingVertical: getScaleSizeWidth(15),
  },
  flatGridStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
