import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  CodeNumberInputs,
  TouchableIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold,
  LongSquareButton
} from 'components';

import styles from './AuthConfirmationScreen.component.styles';
import SecondStepSquareIcon from '../../../../assets/All_Icons/loader/second_square_of_four.svg';

export const CodeConfirmationInputs = ({ onPressSubmit, isFilled }) => (
  <View style={styles.input_wrapper}>
    <CodeNumberInputs numberOfInputs={6} onPressSubmit={(code) => onPressSubmit(code) } isFilled={isFilled}/>
  </View>
);

CodeConfirmationInputs.propTypes = {
  onPressSubmit: PropTypes.func.isRequired
};
export const ResendConfirmation = ({ onPress }) => (
  <View style={styles.verification_container}>
    <View>
      <TypoGraphyOpenSans text={"Te hemos reenviado un correo con el código"} style={styles.verification_text} />
      <TypoGraphyOpenSans text={" Comprueba que no esté en la carpeta Spam."} style={styles.verification_text} />
    </View>
    <View style={styles.verification_middle}>
      <TypoGraphyOpenSans text={""} style={styles.verification_text} />
    </View>
    {OkButton({ onPress })}
  </View>
);
ResendConfirmation.propTypes = {
  onPress: PropTypes.func.isRequired,
};
export const StepIcon = () => (
  <View style={styles.stepper_icon}>
    <SecondStepSquareIcon />
  </View>
);
const OkButton = ({ onPress }) => (
  <LongSquareButton
    onPress={() => onPress()}
    btnText={<TypoGraphyOpenSansBold text={"Ok"} style={styles.ok_btn_text} />}
    btnStyle={styles.ok_button}
    />
);

OkButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const ConfirmationCodeAssitance = ({ onPress }) => (
  <View style={styles.warningText_wrapper}>
    <TypoGraphyOpenSansLight
      style={styles.warningText}
      text={"¿No has recibido el código? Pulsa "}
    />
    <TouchableIcon
      onPress={() => onPress()}
      icon={<TypoGraphyOpenSansBold
        style={styles.warningText_hight}
        text={"aquí."}
      />}
    />
  </View>
);

ConfirmationCodeAssitance.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const IntructionsOfCodeConfirmation = () => (
  <TypoGraphyOpenSansLight
    style={styles.secondaryText}
    text={"Revisa tu correo electrónico e introduce el código que te acabamos de mandar. Esto puede tardar unos segundos"}
  />
);

export const JoinKetepongoHeading = () => (
  <TypoGraphyOpenSansBold style={styles.heading} text={"¡Únete a Ketepongo!"} />
);
