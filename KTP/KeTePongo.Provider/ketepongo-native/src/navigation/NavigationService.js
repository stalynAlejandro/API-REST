import 'react-native-gesture-handler';

import { StackActions, NavigationActions } from 'react-navigation';
import { ROUTES } from 'constants';

let _navigator;

const setNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
const navigateTest = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate('Dashboard',
    {},
    NavigationActions.navigate({
        routeName: ROUTES.AuthBusinessRegistrationScreen
    }))
  );
};

const navigateBack = (params) => {
  _navigator.dispatch(
    NavigationActions.back(params)
  );
};

const resetNavigation = () => {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: ROUTES.AuthScreen })]
    })
  );
};

export default {
  navigate,
  setNavigator,
  navigateBack,
  resetNavigation,
  navigateTest
};
