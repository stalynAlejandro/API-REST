import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { 
  DualOptionButtons,
  TouchableIcon, 
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
} from 'components';

import styles from './VerticalDotsMenuButton.component.styles';

import VerticalDots from '../../../../assets/All_Icons/basic/vertical_dots.svg';
import XBlackIcon from '../../../../assets/All_Icons/basic/x_black.svg';

export const AlertDeleteOrderDisplay = ({ onPressYes, onPressNo }) => (
  <View style={styles.modal}>
    <TypoGraphyOpenSans style={styles.alert_heading} text={"Estás a punto de eliminar el pedido."} />
    <TypoGraphyOpenSansBold style={styles.alert_heading_question} text={"¿Estás seguro?"} />
    <DualOptionButtons
      textLeft={"Sí"}
      textRight={"No"}
      onPressLeft={() => onPressYes()}
      onPressRight={() => onPressNo()}
    />
  </View>
);

AlertDeleteOrderDisplay.propTypes = {
  onPressYes: PropTypes.func.isRequired,
  onPressNo: PropTypes.func.isRequired
};

const MenuHeading = ({ onPress, heading, backgroundDark }) => (
  <View style={backgroundDark? styles.menu_section_dark : styles.menu_section}>
    <TouchableIcon
      onPress={() => onPress()}
      icon={<TypoGraphyOpenSans style={styles.menu_heading} text={heading} />}
    />
  </View>
);

MenuHeading.propTypes = {
  backgroundDark: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  heading: PropTypes.func.isRequired
};

export const VerticalMenuDisplay = ({
  onPressClose,
  onPressChangeOrderDate,
  onPressAddComment,
  onPressDeleteOrder
}) => (
  <View style={styles.menu_container}>
    <View style={styles.menu_close_wrapper}>
      <TouchableIcon
        onPress={() => onPressClose()}
        icon={<XBlackIcon />}
      />
    </View>
    {MenuHeading({ onPress: () => onPressChangeOrderDate(), heading: "Modificar Fechas Entrega" })}
    {MenuHeading({ onPress: () => onPressAddComment(), heading: "Observaciones a Proveedores", backgroundDark: true })}
    {MenuHeading({ onPress: () => onPressDeleteOrder(), heading: "Eliminar Pedido" })}
  </View>
);

VerticalMenuDisplay.propTypes = {
  onPressClose: PropTypes.func.isRequired,
  onPressChangeOrderDate: PropTypes.func.isRequired,
  onPressAddComment: PropTypes.func.isRequired,
  onPressDeleteOrder: PropTypes.func.isRequired,
};

export const TouchableVerticalDots = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={(
      <View style={styles.accept_wrapper}>
        <VerticalDots {...styles.vertical_dots} style={styles.accept_icon} />
      </View>
    )}
  />
);

TouchableVerticalDots.propTypes = {
  onPress: PropTypes.func.isRequired
};
