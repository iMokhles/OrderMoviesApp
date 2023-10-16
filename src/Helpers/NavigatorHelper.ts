import {
  RouteProp,
  StackActions,
  DrawerActions,
  TabActions,
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/**
 *
 */
export function pop(count: number = 1) {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.current?.dispatch(StackActions.pop(count));
    }
  }
}

/**
 *
 */
export function popToTop() {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.current?.dispatch(StackActions.popToTop());
    }
  }
}

/**
 *
 * @param name
 * @param params
 */
export function push(name: string, params?: object) {
  const current = getCurrentRoute();
  if (navigationRef.isReady() && current?.name !== name) {
    // @ts-ignore
    navigationRef.current?.dispatch(StackActions.push(name, params));
  }
}

/**
 *
 * @param name
 * @param params
 */
export function replace(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  }
}

/**
 *
 * @param name
 * @param params
 */
export function reset(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.current?.dispatch(CommonActions.reset(name, params));
  }
}

/**
 *
 * @param name
 * @param params
 */
export function navigate(name: never, params: never) {
  if (navigationRef.isReady()) {
    navigationRef.current?.navigate(name, params);
  }
}

/**
 *
 */
export function openDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(DrawerActions.openDrawer());
  }
}

/**
 *
 */
export function toggleDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
  }
}

/**
 *
 */
export function closeDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.closeDrawer());
  }
}

/**
 *
 * @param name
 * @param params
 */
export function drawerJumpTo(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.dispatch(DrawerActions.jumpTo(name, params));
  }
}

/**
 *
 * @param name
 * @param params
 */
export function jumpTo(name: string, params?: object) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.dispatch(TabActions.jumpTo(name, params));
  }
}

/**
 *
 * @param state
 */
export const getRoute = (state: any): RouteProp<any, any> => {
  const route = state.routes[state.index];
  return route.state ? getRoute(route.state) : route;
};

/**
 *
 */
export const getActiveRoute = () => {
  if (navigationRef.isReady()) {
    return getRoute(navigationRef.current?.getRootState());
  }
};

/**
 *
 */
export const getCurrentRoute = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
};

export const useNavigation = () => navigationRef;
