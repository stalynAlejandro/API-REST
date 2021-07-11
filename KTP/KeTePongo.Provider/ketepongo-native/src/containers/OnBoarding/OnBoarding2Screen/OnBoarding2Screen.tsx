import React from "react";
import { connect } from "react-redux";
import styles from "../OnBoardingScreen.component.styles";
import {
  navigateBack,
  navigateToOnBoarding3Screen
} from '../../../store/providerCatalogProducts';
import { withAuthentication } from "../../../HOC";
import { OnBoardingScreen } from "../OnBoardingScreen.UI";

let OnBoarding2Screen = ({ ...props }) => {
  const {
    navigateToOnBoarding3Screen
  } = props;

  return (
    <OnBoardingScreen 
    screenNumber="2" 
    screenText={"Crea o vincula tu catálogo a KeTePongo\nBusiness para ofrecer productos a tus\nclientes y que te hagan pedidos\nfácilmente a través de su teléfono\nmóvil."}
    buttonText="Siguiente" 
    buttonOnPress={navigateToOnBoarding3Screen}/>
  );

};

OnBoarding2Screen.defaultProps = {
  styles
};

const mapDispatchToProps = {
  navigateBack,
  navigateToOnBoarding3Screen
};

OnBoarding2Screen = withAuthentication((connect(
  null,
  mapDispatchToProps,

)(OnBoarding2Screen)));

export { OnBoarding2Screen };
