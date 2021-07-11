import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LongSquareButton, TypoGraphyOpenSansBold, TypoGraphyOpenSans, TypoGraphyOpenSansSemiBold } from 'components';

import styles from './AuthLogInScreen.component.styles';

export const LoginButton = ({ onPress }) => (
  <View style={styles.continue_btn_wrapper}>
    <LongSquareButton
      btnText={<TypoGraphyOpenSansBold text={"Iniciar Sesión"} style={styles.enter_btn_text} />}
      onPress={() => onPress()}
      />
  </View>
);

LoginButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const WelcomeHeading = () => (
  <TypoGraphyOpenSansBold style={styles.heading} text={"¡Bienvenido de nuevo!"} />
);
const OkButton = ({ onPress }) => (
  <LongSquareButton 
    onPress={() => onPress()} 
    btnText={<TypoGraphyOpenSansBold text={"Ok"} style={styles.ok_btn_text} />} 
    btnStyle={styles.ok_button}
    /> 
);

export const NotAllowed = ({ onPress }) => (
  <View style={styles.not_allowed_container}>
    <View>
      <TypoGraphyOpenSans text={"Su administrador no habilitó las características de consumidor. No es posible utilizar la aplicación con esta cuenta."} style={styles.not_allowed_text} />
      <TypoGraphyOpenSansSemiBold text={""} style={styles.not_allowed_text}/>
    </View>
    <View style={styles.not_allowed_middle}>
      <TypoGraphyOpenSans text={""} style={styles.not_allowed_text} />
    </View>
    {OkButton({ onPress })}
  </View>
);
