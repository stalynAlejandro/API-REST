import 'react-native-gesture-handler';

import { createStackNavigator } from "react-navigation-stack";

import {
  AuthLoadingScreen
} from '../containers/AuthLoadingScreen';

export default createStackNavigator({
  AuthLoadingScreen: {
    screen: AuthLoadingScreen,
    navigationOptions: {
        headerShown: false,
    }
  }
});
