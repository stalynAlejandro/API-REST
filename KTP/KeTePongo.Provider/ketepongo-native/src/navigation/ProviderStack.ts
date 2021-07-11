import 'react-native-gesture-handler';

import { createStackNavigator } from "react-navigation-stack";

import { ProviderMainScreen } from '../containers/ProviderMainScreen';
import { ProviderProductCatalogScreen } from '../containers/ProviderProductCatalogScreen';
import { ProviderCRUDScreen } from '../containers/ProviderCRUDScreen';
import { ProfileStack } from "./DashboardStack";

export default createStackNavigator({
  ProviderMainScreen: {
    screen: ProviderMainScreen,
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
  ProviderCRUDScreen: {
    screen: ProviderCRUDScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ...ProfileStack
});
