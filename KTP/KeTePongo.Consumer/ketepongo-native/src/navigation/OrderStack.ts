import 'react-native-gesture-handler';

import { createStackNavigator } from "react-navigation-stack";

import { OrderScreen } from '../containers/OrderScreen';
import { DetailOrderScreen } from '../containers/DetailOrderScreen';
import { CartScreen } from '../containers/CartScreen';
import { CartDetailScreen } from '../containers/CartDetailScreen';
import { ProfileStack } from "./DashboardStack";

export default createStackNavigator({
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  DetailOrderScreen: {
    screen: DetailOrderScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  CartScreen: {
    screen: CartScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  CartDetailScreen: {
    screen: CartDetailScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ...ProfileStack
});
