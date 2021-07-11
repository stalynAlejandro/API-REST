import React from "react";
import { connect } from "react-redux";
import styles from "../OnBoardingScreen.component.styles";
import {
  navigateBack,
  navigateToOnBoarding2Screen
} from '../../../store/providerCatalogProducts';
import { withAuthentication } from "../../../HOC";
import { OnBoardingScreen } from "../OnBoardingScreen.UI";

let OnBoarding1Screen = ({ ...props }) => {
  const {
    navigateToOnBoarding2Screen
  } = props;

  return (
    <OnBoardingScreen 
    screenNumber="1" 
    screenText={"Con Ketepongo Business puedes\nrecibir pedidos de tus clientes de\nmanera ágil y sencilla\n"} 
    buttonText="Siguiente" 
    buttonOnPress={navigateToOnBoarding2Screen}/>
  );

};

OnBoarding1Screen.defaultProps = {
  styles
};

const mapDispatchToProps = {
  navigateBack,
  navigateToOnBoarding2Screen
};

OnBoarding1Screen = withAuthentication((connect(
  null,
  mapDispatchToProps,

)(OnBoarding1Screen)));

export { OnBoarding1Screen };
