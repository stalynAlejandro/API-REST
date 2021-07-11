import React from "react";
import { View, Linking, Platform, SafeAreaView } from "react-native";
import styles from "./UpgradeApp.component.styles";
import { LAYOUT } from "constants";
import Background from "../../../assets/All_Icons/basic/background.svg";
import {
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold
} from "components";
import { useDispatch, useSelector } from "react-redux";

/*Linking.openURL("market://details?id=googoo.android.btgps"), //addProductCarteToCatalog(productCarte)
//Linking.openURL('itms-apps://itunes.apple.com/us/app/apple-store/myiosappid?mt=8') ios*/

interface IUpgradeAppScreen{
  isDisconnectedFromServer: boolean,
  retryConnection: Function,
}

export const UpgradeAppScreen = ({isDisconnectedFromServer, retryConnection}: IUpgradeAppScreen) => {
  const { height, width } = LAYOUT.WINDOW;
  const authenticationState = useSelector(
    (state) => state.authentication
  );

  if(isDisconnectedFromServer){
    return(
      <SafeAreaView style={{flex:1}}>
        <View>
      <Background height={height} width={width} style={styles.background} />
      <View style={styles.dialog_container}>
        <TypoGraphyOpenSans
          style={styles.dialog_text}
          text={"No se pudo conectar con el servidor"}
        />
        <TypoGraphyOpenSansBold
          onPress={()=>{retryConnection()}}
          style={styles.button}
          text={"Reintentar"}
        />
      </View>
      </View>
    </SafeAreaView >)
  }


  return (
    <SafeAreaView style={{flex:1}}>
      <View>
      <Background height={height} width={width} style={styles.background} />
      <View style={styles.dialog_container}>
        <TypoGraphyOpenSans
          style={styles.dialog_text}
          text={"Es necesario actualizar la aplicación para continuar."}
        />
        <TypoGraphyOpenSansBold
          onPress={() =>
            Linking.openURL(
              Platform.OS === "android"
                ? authenticationState.googlePlayAppUrl
                : authenticationState.appleAppStoreUrl
            )
          }
          style={styles.button}
          text={"Actualizar"}
        />
      </View>
      </View>
    </SafeAreaView >
  );
};
