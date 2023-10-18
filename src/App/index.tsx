import tamaguiConfig from '@config/tamagui.config';
import {
  getActiveRoute,
  getRoute,
  navigationRef,
} from '@helpers/NavigatorHelper';
import Navigators from '@navigators/index';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {persistor, store} from '@rredux/store';
import React, {FC, useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {TamaguiProvider} from 'tamagui';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
};

export default App;
