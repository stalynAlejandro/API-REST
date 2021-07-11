import 'react-native-gesture-handler';

/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { Animated, Platform, Easing, View, Text } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { ROUTES, COLORS, HEIGHT } from 'constants';
import NavigationService from './NavigationService';
import { NavigationIcon, NavigationLabel, DisplayOrderHeader } from 'components';


import AuthLoadingStack from './AuthLoadingStack';
import ProviderStack from './ProviderStack';
import LocationStack from './LocationStack';
import SectionStack from './SectionStack';
import OrderStack from './OrderStack';
import OrdersStack from './OrdersStack';
import AuthStack from './AuthStack';
import ProductCarteStack from './ProductCarteStack';
import UpgradingAppStack from "./UpgradingAppStack"
import OnBoardingStack from "./OnBoardingStack"
import DisplayOrderStack from "./DisplayOrderStack";
import ClientsStack from './ClientsStack';
import NotificationsStack from './NotificationsStack';
import db from "../store/apis/db";
import { store } from '../App';
import { useSelector } from "react-redux";

const Nav = () => {
  const [isLinkedToERP, setIsLinkedToERP] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isUserLoggedState = useSelector(
    (state) => state.authentication.isUserLogged
  );
  const isInitialAuthenticationStateRetrievedState = useSelector(
    (state) => state.authentication.isInitialAuthenticationStateRetrieved
  );

  useEffect(() => {
    async function fetch() {
      let result = undefined;
      if (isUserLoggedState && isInitialAuthenticationStateRetrievedState) {
        try {
          result = await (await db.apiProviders({}, store.getState)).get("Provider");
        } catch (error) {
          console.log("error", error);
        }
        if (result !== undefined) {
          setIsLinkedToERP(result.data.isLinkedToERP);
        }
      }
    }
    fetch();
    setIsLoading(false);
    return () => { }
  }, [isUserLoggedState, isInitialAuthenticationStateRetrievedState]);
  if (isLoading === true) {
    return null;
  }

  const initialRouteName = isLinkedToERP ? ROUTES.Orders : ROUTES.myProducts;
  const routes = isLinkedToERP ? {
    [ROUTES.Orders]: OrdersStack,
    [ROUTES.Clients]: ClientsStack,
    [ROUTES.Notifications]: NotificationsStack,
  }:
  {
    [ROUTES.myProducts]: ProductCarteStack,
    [ROUTES.sections]: SectionStack,
    [ROUTES.Notifications]: NotificationsStack,
  };
  const BottomStack =  createBottomTabNavigator(routes,
    {
      defaultNavigationOptions: ({ navigation }) => {
        const { routes } = navigation.state;
        const lastRoute = routes[routes.length - 1];
        const tabBarIcon = ({ focused }) => <NavigationIcon active={focused} navigation={navigation} />;
        const tabBarLabel = ({ focused }) => <NavigationLabel active={focused} navigation={navigation} />;

        return {
          tabBarVisible: hideNavigationRoutes(lastRoute),
          tabBarIcon,
          tabBarLabel,
        };
      },
      tabBarOptions: {
        initialRouteName: initialRouteName,
        activeTintColor: COLORS.main,
        inactiveTintColor: COLORS.neutral_medium,
        style: {
          backgroundColor: COLORS.shadow_black,
          position: 'absolute',
          borderTopColor: 'transparent',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          ...HEIGHT.navigationHeight,
          ...Platform.select({
            ios: {
              shadowColor: COLORS.shadow_blue,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: .5,
              shadowRadius: 1,
            },
            android: {
              elevation: 3,
            },
          }),
        },
        tabStyle: {
          backgroundColor: COLORS.neutral_min,
          marginTop: 1.5,
          zIndex: 1,
        },
        indicatorStyle: {
          backgroundColor: 'transparent'
        }
      }
    });
  const AppStack = createStackNavigator({
    bottomNavigator: {
      screen: BottomStack,
      navigationOptions: {
        headerShown: false,
      }
    },
    [ROUTES.DisplayOrderCatalogCarteScreen]: {
      screen: DisplayOrderStack,
      navigationOptions: {
        headerShown: false,
      }
    },
  });
  const AppNavigator = createAppContainer(createSwitchNavigator(
    {
      Starter: AuthLoadingStack,
      Auth: AuthStack,
      App: AppStack,
      Upgrading: UpgradingAppStack,
      OnBoarding: OnBoardingStack,
      DisplayOrderCatalogCarteScreen: DisplayOrderStack,
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

  return (<AppNavigator ref={(navigatorRef) => NavigationService.setNavigator(navigatorRef)} />);
}

export default Nav;

const hideNavigationRoutes = (lastRoute) => {
  const hideNavgicationScreens = [
    // ROUTES.ProductCreateScreen,
    // ROUTES.ProductEditScreen,
    // ROUTES.CartScreen,
    // ROUTES.CartDetailScreen,
    ROUTES.ProductCarteCatalogFilterScreen,
    ROUTES.ProductCarteCreateScreen,
    ROUTES.ProductCarteEditScreen,
    ROUTES.EditBusinessProfileScreen,
    ROUTES.SectionCRUDScreen,
    ROUTES.QRCarteScreen,
    ROUTES.ShareQRCarteScreen,
    ROUTES.UpgradeAppScreen,
    ROUTES.AuthLogInScreen,
    ROUTES.AuthScreen,
    ROUTES.DisplayOrderCatalogCarteScreen,
    ROUTES.ProfileScreen
  ];

  return !hideNavgicationScreens.includes(lastRoute.routeName);
};
