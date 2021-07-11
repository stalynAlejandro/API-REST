import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  CodeNumberInputs,
  TouchableIcon,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold,
} from 'components';

import styles from './AuthChangeEmailConfirmationScreen.component.styles';
import SecondStepSquareIcon from '../../../../assets/All_Icons/loader/second_square_of_four.svg';

export const CodeConfirmationInputs = ({ onPressSubmit, isFilled }) => (
  <View style={styles.input_wrapper}>
    <CodeNumberInputs numberOfInputs={6} onPressSubmit={(code) => onPressSubmit(code) } isFilled={isFilled}/>
  </View>
);

CodeConfirmationInputs.propTypes = {
  onPressSubmit: PropTypes.func.isRequired
};

export const StepIcon = () => (
  <View style={styles.stepper_icon}>
    <SecondStepSquareIcon />
  </View>
);

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
    text={"Introduce el código que te acabamos de mandar al número que nos has indicado en el paso anterior. Esto puede tardar unos segundos."}
  />
);

export const JoinKetepongoHeading = () => (
  <TypoGraphyOpenSansBold style={styles.heading} text={"¡Únete a Ketepongo!"} />
);
