import 'react-native-gesture-handler';

import React from 'react';
//import {View,Text} from "react-native";
import Navigator from './navigation';
import storeConfig from './store/storeConfig';
import {setNotificationHandler, addNotificationResponseReceivedListener} from 'expo-notifications'
import NavigationService from './navigation/NavigationService'
import {ROUTES} from './constants'
import { Provider } from 'react-redux';
import { YellowBox, StatusBar } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
require('moment/locale/es.js');
console.disableYellowBox = true; //TODO fix warnings but this is too irritating right now having half screen yellow

export const store = storeConfig();

class App extends React.Component {

  componentDidMount(){
    setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    addNotificationResponseReceivedListener(response => {
      NavigationService.navigate(ROUTES.NotificationsScreen)
    })
  }

  render() {
    StatusBar.setBarStyle('light-content');
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
