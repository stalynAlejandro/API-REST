import React from "react";
import { connect } from "react-redux";
import styles from "../OnBoardingScreen.component.styles";
import {
  navigateBack,
  navigateToCatalog
} from '../../../store/providerCatalogProducts';
import { OnBoardingScreen } from "../OnBoardingScreen.UI";
import { withAuthentication } from "../../../HOC";

let OnBoarding4Screen = ({ ...props }) => {
  const {
    navigateToCatalog
  } = props;

  return (
    <OnBoardingScreen 
    screenNumber="4" 
    screenText={"¡Comienza ya a usar Ketepongo Business y recibe pedidos de manera ágil y sencilla!"}
    buttonText="Comenzar"
    buttonOnPress={navigateToCatalog}/>
  );
  
};

OnBoarding4Screen.defaultProps = {
  styles
};

const mapDispatchToProps = {
  navigateBack,
  navigateToCatalog
};

OnBoarding4Screen = withAuthentication((connect(
  null,
  mapDispatchToProps,

)(OnBoarding4Screen)));

export { OnBoarding4Screen };
