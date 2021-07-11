import 'react-native-gesture-handler';

import { createStackNavigator } from "react-navigation-stack";

import { OnBoarding1Screen } from '../containers/OnBoarding/OnBoarding1Screen';
import { OnBoarding2Screen } from '../containers/OnBoarding/OnBoarding2Screen';
import { OnBoarding3Screen } from '../containers/OnBoarding/OnBoarding3Screen';
import { OnBoarding4Screen } from '../containers/OnBoarding/OnBoarding4Screen';

export default createStackNavigator({
  OnBoarding1Screen: {
    screen: OnBoarding1Screen,
    navigationOptions: {
        headerShown: false,
    }
  },
  OnBoarding2Screen: {
    screen: OnBoarding2Screen,
    navigationOptions: {
        headerShown: false,
    }
  },
  OnBoarding3Screen: {
    screen: OnBoarding3Screen,
    navigationOptions: {
        headerShown: false,
    }
  },
  OnBoarding4Screen: {
    screen: OnBoarding4Screen,
    navigationOptions: {
        headerShown: false,
    }
  },
  
});
