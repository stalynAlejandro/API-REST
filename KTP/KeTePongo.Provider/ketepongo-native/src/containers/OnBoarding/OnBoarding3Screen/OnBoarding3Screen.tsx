import React from "react";
import { connect } from "react-redux";
import styles from "../OnBoardingScreen.component.styles";
import {
  navigateBack,
  navigateToOnBoarding4Screen
} from '../../../store/providerCatalogProducts';
import { OnBoardingScreen } from "../OnBoardingScreen.UI";
import { withAuthentication } from "../../../HOC";

let OnBoarding3Screen = ({ ...props }) => {
  const {
    navigateToOnBoarding4Screen
  } = props;

  return (
    <OnBoardingScreen 
    screenNumber="3" 
    screenText={"Cuando recibas pedidos, tendrás que revisarlos y validarlos para comprobar que todo esté bien y poder hacer el envío."}
    buttonText="Siguiente" 
    buttonOnPress={navigateToOnBoarding4Screen}/>
  );

};

OnBoarding3Screen.defaultProps = {
  styles
};

const mapDispatchToProps = {
  navigateBack,
  navigateToOnBoarding4Screen
};

OnBoarding3Screen = withAuthentication((connect(
  null,
  mapDispatchToProps,

)(OnBoarding3Screen)));

export { OnBoarding3Screen };
