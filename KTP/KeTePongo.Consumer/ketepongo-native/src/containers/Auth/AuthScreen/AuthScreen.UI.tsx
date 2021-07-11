import React from 'react';
import PropTypes from 'prop-types';
import { View , Text} from 'react-native';
import {
  LongSquareButton,
  TouchableIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold,
} from 'components';

import styles from './AuthScreen.component.styles';

export const RegisterButton = ({ onPress }) => (
  <View style={styles.register_btn_wrapper}>
    <LongSquareButton
      btnText={<TypoGraphyOpenSansBold text={"Regístrate"} style={styles.register_btn_text} />}
      onPress={() => onPress()}
      btnStyle={{height:48}}
    />
  </View>
);

RegisterButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const LoginAccess = ({ onPress }) => (
  <View>
    <Text onPress={() => onPress()}
           style={styles.loginText}>¿Ya tienes una cuenta? Pulsa aquí para
        <Text style={styles.loginText_bold}> Iniciar Sesión. </Text> 
    </Text>
  </View>
);

LoginAccess.propTypes = {
  onPress: PropTypes.func.isRequired
};
const OkButton = ({ onPress }) => (
  <LongSquareButton 
    onPress={() => onPress()} 
    btnText={<TypoGraphyOpenSansBold text={"Ok"} style={styles.ok_btn_text} />} 
    btnStyle={styles.ok_button}
    /> 
);

export const SessionClosed = ({ onPress }) => (
  <View style={styles.session_closed_container}>
    <View>
      <TypoGraphyOpenSans text={"Se cerró la sesión desde otro dispositivo y es necesario que vuelva a introducir sus credenciales."} style={styles.session_closed_text} />
      <TypoGraphyOpenSansSemiBold text={""} style={styles.session_closed_text}/>
    </View>
    <View style={styles.session_closed_middle}>
      <TypoGraphyOpenSans text={""} style={styles.session_closed_text} />
    </View>
    {OkButton({ onPress })}
  </View>
);