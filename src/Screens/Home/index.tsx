import {useGetPopularMoviesQuery} from '@api/TMDB';
import React, {FC, useEffect} from 'react';
import {Else, If, Then} from 'react-if';
import {View, StyleSheet} from 'react-native';
import {Spinner, Text} from 'tamagui';

const HomeScreen: FC = () => {
  const {data, error, isFetching} = useGetPopularMoviesQuery(1);

  useEffect(() => {
    if (!isFetching) {
      if (error) {
        console.log('data: ', data);
      }
      if (data) {
        console.log('data: ', data);
      }
    }
  }, [data]);

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        <If condition={isFetching}>
          <Then>
            <Spinner size="large" color="$red11" />
          </Then>
          <Else>
            <If condition={error != null}>
              <Then>
                <Text fontWeight={'700'}>{error?.data?.status_message}</Text>
              </Then>
              <Else>
                <Text fontWeight={'700'}>DATA AVAILABLE</Text>
              </Else>
            </If>
          </Else>
        </If>
      </View>
    );
  };
  return _renderContent();
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
