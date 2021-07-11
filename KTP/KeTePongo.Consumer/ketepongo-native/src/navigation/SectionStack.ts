import 'react-native-gesture-handler';

import { createStackNavigator } from "react-navigation-stack";

import { SectionMainScreen } from '../containers/SectionMainScreen';
import { SectionCRUDScreen } from '../containers/SectionCRUDScreen';
import { ProfileStack } from "./DashboardStack";

const SectionStack = {
  SectionMainScreen: {
    screen: SectionMainScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  SectionCRUDScreen: {
    screen: SectionCRUDScreen,
    navigationOptions: {
        headerShown: false,
    }
  }
};


export default createStackNavigator({
  ...SectionStack,
  ...ProfileStack,
});
