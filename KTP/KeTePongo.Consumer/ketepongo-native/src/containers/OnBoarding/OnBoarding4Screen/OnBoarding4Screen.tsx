import React from "react";
import { connect } from "react-redux";
import styles from "../OnBoardingScreen.component.styles";
import {
  navigateBack,
  navigateToMyProducts
} from '../../../store/authentication';
import { OnBoardingScreen } from "../OnBoardingScreen.UI";
import { withAuthentication } from "../../../HOC";

let OnBoarding4Screen = ({ ...props }) => {
  const {
    navigateToMyProducts
  } = props;

  return (
    <OnBoardingScreen 
    screenNumber="4" 
    screenText={"¡Comienza ya a usar Ketepongo para hacer pedidos a tus proveedores fácilmente a través de tu móvil!"}
    buttonText="Comenzar"
    buttonOnPress={navigateToMyProducts}/>
  );
  
};

OnBoarding4Screen.defaultProps = {
  styles
};

const mapDispatchToProps = {
  navigateBack,
  navigateToMyProducts
};

OnBoarding4Screen = withAuthentication((connect(
  null,
  mapDispatchToProps,

)(OnBoarding4Screen)));

export { OnBoarding4Screen };
