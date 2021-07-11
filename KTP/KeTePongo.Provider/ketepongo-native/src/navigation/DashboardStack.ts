import "react-native-gesture-handler";

import { createStackNavigator } from "react-navigation-stack";
import { ProfileScreen } from "../containers/ProfileScreen";
import { EditProfileScreen } from "../containers/EditProfileScreen";
import { EditBusinessProfileScreen } from "../containers/EditBusinessProfileScreen";
import { QRCarteScreen } from "../containers/QRCarteScreen/QRCarteScreen";
import { ShareQRCarteScreen } from "../containers/ShareQRCarteScreen/ShareQRCarteScreen";
import { ImpersonateScreen } from '../containers/ImpersonateScreen';
import { AuthChangeEmailConfirmationScreen } from '../containers/Auth'

export const ProfileStack = {
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditProfileScreen: {
    screen: EditProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AuthChangeEmailConfirmationScreen: {
    screen: AuthChangeEmailConfirmationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  QRCarteScreen: {
    screen: QRCarteScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ShareQRCarteScreen: {
    screen: ShareQRCarteScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditBusinessProfileScreen: {
    screen: EditBusinessProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ImpersonateScreen: {
    screen: ImpersonateScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
};
