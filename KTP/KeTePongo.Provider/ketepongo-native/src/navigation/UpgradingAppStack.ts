import { createStackNavigator } from "react-navigation-stack";

import { UpgradeAppScreen } from "../components/UpgradeApp/UpgradeApp";

export default createStackNavigator({
  UpgradeAppScreen: {
    screen: UpgradeAppScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
