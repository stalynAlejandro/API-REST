import React from 'react';
import { View, Text } from 'react-native';
import { TypoGraphyOpenSansBold, TypoGraphyOpenSansLight } from 'components';

import styles from './AuthAddUserScreen.component.styles';
import ForthStepSquareIcon from '../../../../assets/All_Icons/loader/four_square_of_four.svg';

export const StepperIcon = () => (
  <View style={styles.stepper_icon}>
    <ForthStepSquareIcon />
  </View>
);

export const InsertEmailHeading = () => (
  <View style={styles.secondary_heading_wrapper}>
    <TypoGraphyOpenSansLight
      style={styles.secondary_text}
      text={"Inserta los emails correspondientes:"} />
  </View>
);

export const AddUserInstructions = () => (
  <View style={styles.first_parragraph}>
    <Text style={styles.secondary_text}>Para terminar,
    <Text style={styles.secondary_text_high}> puedes añadir a tus socios o empleados </Text>
      para que ellos también puedan hacer pedidos para tu local a través de Ketepongo.
      Puedes gestionar el cargo de cada uno de ellos en la
    <Text style={styles.secondary_text_high}> pantalla Editar Empleados.</Text>
    </Text>
  </View>
);

export const AddUserHeading = () => (
  <TypoGraphyOpenSansBold style={styles.heading} text={"¡Únete a Ketepongo!"} />
);
