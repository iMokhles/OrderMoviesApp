import {NavRoutes} from '@constants/NavRoutes';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

// Default nav options for all screens
export const appScreensNavOptions: Partial<
  Record<NavRoutes, NativeStackNavigationOptions>
> = {
  [NavRoutes.Home]: {
    headerTitle: 'Movies',
  },
  [NavRoutes.Details]: {
    headerShown: false,
  },
};
