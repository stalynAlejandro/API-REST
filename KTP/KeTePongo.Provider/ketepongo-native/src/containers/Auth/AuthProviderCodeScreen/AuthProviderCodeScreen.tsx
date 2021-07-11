import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, SafeAreaView  } from "react-native";
import {
  Spinner,
  TypoGraphyNunitoRegular,
  TypoGraphyNunitoBold,
  TypoGraphyNunitoWithHighlight,
  LongSquareButton
} from "components";

import db from "../../../store/apis/db";
import styles from "./AuthProviderCodeScreen.component.styles";
import {
  navigateToOnBoarding1Screen
} from '../../../store/providerCatalogProducts';

import AlertCircle from "../../../../assets/All_Icons/alertCircle.svg";
import { withAuthentication } from "../../../HOC";
import { store } from '../../../App';


let AuthProviderCodeScreen = ({ ...props }) => {
  const {
    navigateToOnBoarding1Screen
  } = props;

  useEffect(()=>{

    async function fetch(){
      const result = await (await db.apiProviders({}, store.getState)).get("Provider");
      setData(result.data);
    }
    fetch()
    return ()=>{}
  }, []);
  const [businessData, setData] = useState(null);
  if (!businessData) {
    return <Spinner />;
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View  style={styles.container}>
      <TypoGraphyNunitoBold text="¡Bienvenido a Ketepongo!" style={styles.heading} />
      
      <TypoGraphyNunitoBold style={styles.sub_heading} text={"Código ketepongo"} />
      <TypoGraphyNunitoWithHighlight
        style={styles.text}
        text={"Este código le servirá al usuario para poder"}
        highlightText={" identificar tu local en la app y acceder a tu carta"}
        secondText={" para hacerte el pedido."}
      />
      <TypoGraphyNunitoWithHighlight
        style={styles.text_1}
        text={""}
        highlightText={"Te recomendamos que tengas este código bien visible dentro de tu local,"}
        secondText={" para que tus clientes puedan localizarlo fácilmente y entrar a tu carta."}
      />
      <TypoGraphyNunitoWithHighlight
        style={styles.text_2}
        text={""}
        highlightText={"Tus usuarios también pueden encontrarte con el codigo QR"}
        secondText={" que puedes generar en la seccion 'código QR'."}
      />
       <View style={{ flex: 1, flexDirection: 'row' }}>
          <AlertCircle style={{ marginTop: 3, marginRight: 5 }} />
          <TypoGraphyNunitoRegular
            style={styles.hint}
            text={"Podrás acceder en cualquier momento a este código en la pantalla 'Mi Establecimiento'"}
          />
        </View>
        <View style={styles.code_wrapper}>
          <TypoGraphyNunitoBold style={styles.code} text={businessData.code}/>
        </View>
      <View style={styles.btn_wrapper}>
        <LongSquareButton
          btnText={<TypoGraphyNunitoBold text={"Empieza a usar Ketepongo"} style={styles.continue_btn_text} />}
          onPress={() => navigateToOnBoarding1Screen()}
          btnStyle={{ height: 48 }}
        />
      </View>
    </View >
    </SafeAreaView>
  );

};

AuthProviderCodeScreen.defaultProps = {
  styles
};
const mapStateToProps = state => {
  return {
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
    errorRequest: state.authentication.error,
    accessToken: state.authentication.accessToken,
  };
};
const mapDispatchToProps = {
  navigateToOnBoarding1Screen
};

AuthProviderCodeScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,

)(AuthProviderCodeScreen)));

export { AuthProviderCodeScreen };
