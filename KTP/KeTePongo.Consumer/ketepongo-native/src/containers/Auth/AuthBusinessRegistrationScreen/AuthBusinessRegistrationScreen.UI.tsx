import React from 'react';
import { View } from 'react-native';
import {
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans
} from 'components';

import styles from './AuthBusinessRegistrationScreen.component.styles';
import ThirdStepSquareIcon from '../../../../assets/All_Icons/loader/third_square_of_four.svg';

export const StepperIcon = () => (
  <View style={styles.stepper_icon}>
    <ThirdStepSquareIcon />
  </View>
);

export const BusinessRegistrationHeadings = () => (
  <View>
    <TypoGraphyOpenSansBold style={styles.heading} text={"¡Únete a Ketepongo!"} />
    <TypoGraphyOpenSans style={styles.secondary_text} text={"¡Cuéntanos un poco más sobre tu negocio!"} />
  </View>
);
