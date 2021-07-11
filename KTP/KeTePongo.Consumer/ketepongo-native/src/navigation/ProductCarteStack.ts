import "react-native-gesture-handler";

import { createStackNavigator } from "react-navigation-stack";

import { ProductCarteCatalogScreen } from "../containers/ProductCarteCatalogScreen";
import { ProductCarteCatalogFilterScreen } from "../containers/ProductCarteCatalogFilterScreen";
import { ProductCarteCRUDScreen } from "../containers/ProductCarteCRUDScreen";
import { ProfileStack } from "./DashboardStack";
import { AuthScreen } from "../containers/Auth/AuthScreen";

const ProductCarteStack = {
  ProductCarteCatalogScreen: {
    screen: ProductCarteCatalogScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ProductCarteCatalogFilterScreen: {
    screen: ProductCarteCatalogFilterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ProductCarteEditScreen: {
    screen: ProductCarteCRUDScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ProductCarteCreateScreen: {
    screen: ProductCarteCRUDScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

};

export default createStackNavigator({
  ...ProductCarteStack,
  ...ProfileStack,
  AuthScreen: {
    screen: AuthScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
