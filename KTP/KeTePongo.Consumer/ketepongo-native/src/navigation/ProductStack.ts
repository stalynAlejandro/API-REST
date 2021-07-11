import 'react-native-gesture-handler';

import { createStackNavigator } from "react-navigation-stack";

import { ProductCatalogScreen } from '../containers/ProductCatalogScreen';
import { ProductCatalogFilterScreen } from '../containers/ProductCatalogFilterScreen';
import { ProductSelectProviderScreen } from '../containers/ProductSelectProviderScreen';
import { ProviderProductCatalogScreen } from '../containers/ProviderProductCatalogScreen';
import { ProductCRUDScreen } from '../containers/ProductCRUDScreen';
import { ProfileStack } from "./DashboardStack";

export default createStackNavigator({
  ProductCatalogScreen: {
    screen: ProductCatalogScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ProductCatalogFilterScreen: {
    screen: ProductCatalogFilterScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ProductSelectProviderScreen: {
    screen: ProductSelectProviderScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ProviderProductCatalogScreen: {
    screen: ProviderProductCatalogScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ProductEditScreen: {
    screen: ProductCRUDScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ProductCreateScreen: {
    screen: ProductCRUDScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ...ProfileStack
});
