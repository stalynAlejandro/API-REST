import 'react-native-gesture-handler';

/* eslint-disable react/prop-types */
import React from 'react';
import { Animated, Easing } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import NavigationService from './NavigationService';

import ProductStack from './ProductStack';
import ProviderStack from './ProviderStack';
import LocationStack from './LocationStack';
import SectionStack from './SectionStack';
import OrderStack from './OrderStack';

import AuthLoadingStack from './AuthLoadingStack';
import AuthStack from './AuthStack';
import OnBoardingStack from "./OnBoardingStack"
import ConsumerStack from './ConsumerStack'

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    Starter: AuthLoadingStack,
    Auth: AuthStack,
    OnBoarding: OnBoardingStack,
    ConsumerStack: ConsumerStack,
  },
  {
    initialRouteName: 'Starter',
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
    },
  }
));

export default class Nav extends React.Component {
  render() {
    return (
      <AppNavigator ref={(navigatorRef) => NavigationService.setNavigator(navigatorRef)} />
    );
  }
}

