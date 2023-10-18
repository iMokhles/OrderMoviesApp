import {NavRoutes} from '@constants/NavRoutes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '@screens/index';
import {CreateScreen} from '@utils/NavUtils';
import React from 'react';

const Stack = createNativeStackNavigator();

const MainStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      {/*
       */}
      {CreateScreen(Stack)(NavRoutes.Home, Screens.HomeScreen)}
      {CreateScreen(Stack)(NavRoutes.Details, Screens.DetailsScreen)}
    </Stack.Navigator>
  );
};

export default MainStack;
