import tamaguiConfig from '@config/tamagui.config';
import React, {FC, useEffect, useState} from 'react';
import {TamaguiProvider} from 'tamagui';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import Navigators from '@navigators/index';
import {StatusBar} from 'react-native';
import {
  getActiveRoute,
  getRoute,
  navigationRef,
} from '@helpers/NavigatorHelper';

const App: FC = () => {
  const [routeName, setRouteName] = useState<string | null>(null);

  const onStateChange = (state?: NavigationState) => {
    const previousRouteName = routeName;
    const currentRouteName = getRoute(state).name;
    if (previousRouteName !== currentRouteName) {
      setRouteName(currentRouteName);
    }
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          setRouteName(getActiveRoute()?.name);
        }}
        onStateChange={onStateChange}>
        {/*
         */}
        <StatusBar
          animated={false}
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
        <Navigators.MainStack />
      </NavigationContainer>
    </TamaguiProvider>
  );
};

export default App;
