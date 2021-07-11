import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  LongSquareButton
} from 'components';

import styles from './OrderScreen.component.styles';
import CartStyles from "../CartScreen/CartScreen.component.styles";

export const TabLabelFocused = ({ route }) => (
  <View style={styles.label_container}>
    <TypoGraphyOpenSansBold style={styles.tab_label} text={route.title} />
  </View>
);

TabLabelFocused.propTypes = {
  route: PropTypes.object.isRequired
};

export const TabLabelNotFocused = ({ route }) => (
  <View style={styles.label_container}>
    <TypoGraphyOpenSans style={styles.tab_label} text={route.title} />
  </View>
);

TabLabelNotFocused.propTypes = {
  route: PropTypes.object.isRequired
};

export const AlertConfirmOrderHasbeenMade = ({ onPressOk }) => (
  <View style={CartStyles.modal}>
    <TypoGraphyOpenSans style={CartStyles.alert_heading} text={"¡ENHORABUENA!"} />
    <TypoGraphyOpenSansBold style={CartStyles.alert_heading_question} text={"Has realizado el pedido con éxito."} />
    <LongSquareButton
      onPress={() => onPressOk()}
      btnText={<TypoGraphyOpenSansBold text={"ok"} style={CartStyles.main_btn_text} />}
      btnStyle={CartStyles.blue_btn}
    />
  </View>
);

AlertConfirmOrderHasbeenMade.propTypes = {
  onPressOk: PropTypes.func.isRequired
};
