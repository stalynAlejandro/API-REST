import 'react-native-gesture-handler';

import { createStackNavigator } from "react-navigation-stack";

import {
  AuthAddUserScreen,
  AuthBusinessRegistrationScreen,
  AuthConfirmationScreen,
  AuthLogInScreen,
  AuthRegisterScreen,
  AuthProviderCodeScreen,
  AuthScreen,
} from '../containers/Auth';

export default createStackNavigator({
  AuthScreen: {
    screen: AuthScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  AuthLogInScreen: {
    screen: AuthLogInScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  AuthRegisterScreen: {
    screen: AuthRegisterScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  AuthBusinessRegistrationScreen: {
    screen: AuthBusinessRegistrationScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  AuthConfirmationScreen: {
    screen: AuthConfirmationScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  AuthAddUserScreen: {
    screen: AuthAddUserScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  AuthProviderCodeScreen: {
    screen: AuthProviderCodeScreen,
    navigationOptions: {
        headerShown: false,
    }
  }
});
