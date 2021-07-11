import { createStackNavigator } from "react-navigation-stack";

import { OrdersScreen } from '../containers/OrdersScreen';
import { ValidationScreen } from '../containers/ValidationScreen';

const screenWithoutHeaderNavigationOptions = {
  navigationOptions: {
    header: null
  }
};

export default createStackNavigator({
  OrdersScreen: {
    screen: OrdersScreen,
    ...screenWithoutHeaderNavigationOptions
  },
  ValidationScreen: {
    screen: ValidationScreen,
    ...screenWithoutHeaderNavigationOptions
  },
});