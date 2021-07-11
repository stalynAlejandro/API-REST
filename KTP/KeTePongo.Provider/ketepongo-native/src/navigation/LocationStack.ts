import 'react-native-gesture-handler';

import { createStackNavigator } from "react-navigation-stack";

import { LocationMainScreen } from '../containers/LocationMainScreen';
import { LocationCRUDScreen } from '../containers/LocationCRUDScreen';
import { ProfileStack } from "./DashboardStack";


export default createStackNavigator({
  LocationMainScreen: {
    screen: LocationMainScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  LocationCRUDScreen: {
    screen: LocationCRUDScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  ...ProfileStack
});
