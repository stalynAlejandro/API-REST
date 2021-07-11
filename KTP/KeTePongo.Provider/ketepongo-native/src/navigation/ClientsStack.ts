import { createStackNavigator } from "react-navigation-stack";

import { ClientsScreen } from '../containers/ClientsScreen';
import { ClientOrderListScreen } from '../containers/ClientOrderListScreen';
import { ValidationScreen } from '../containers/ValidationScreen';
import { ClientProductListScreen } from '../containers/ClientProductListScreen';
import { ClientCardScreen } from '../containers/ClientCardScreen';
import { ClientLinkScreen } from '../containers/ClientLinkScreen';

const screenWithoutHeaderNavigationOptions = {
  navigationOptions: {
    header: null
  }
};

export default createStackNavigator({
  ClientsScreen: {
    screen: ClientsScreen,
    ...screenWithoutHeaderNavigationOptions
  },
  ClientOrderListScreen: {
    screen: ClientOrderListScreen,
    ...screenWithoutHeaderNavigationOptions
  },
  ClientValidationScreen: {
    screen: ValidationScreen,
    ...screenWithoutHeaderNavigationOptions
  },
  ClientProductListScreen: {
    screen: ClientProductListScreen,
    ...screenWithoutHeaderNavigationOptions
  },
  ClientCardScreen: {
    screen: ClientCardScreen,
    ...screenWithoutHeaderNavigationOptions
  },
  ClientLinkScreen: {
    screen: ClientLinkScreen,
    ...screenWithoutHeaderNavigationOptions
  },
});