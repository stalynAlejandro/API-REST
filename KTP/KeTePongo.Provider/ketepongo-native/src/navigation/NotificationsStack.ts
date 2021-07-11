import "react-native-gesture-handler";

import { createStackNavigator } from "react-navigation-stack";

import { ProductCarteCatalogScreen } from "../containers/ProductCarteCatalogScreen";
import { ProductCarteCatalogFilterScreen } from "../containers/ProductCarteCatalogFilterScreen";
import { ProductCarteCRUDScreen } from "../containers/ProductCarteCRUDScreen";
import { ProfileStack } from "./DashboardStack";
import { AuthScreen } from "../containers/Auth/AuthScreen";
import { NotificationsScreen } from "../containers/NotificationsScreen/NotificationsScreen";
import { withNavigationFocus } from "react-navigation";

const NotificationsStack = {
  NotificationsScreen: {
    screen: NotificationsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
};

export default createStackNavigator({
  ...NotificationsStack,
  ...ProfileStack,
});
