import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Linking, SafeAreaView } from 'react-native';
import {
  TouchableIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansSemiBold
} from 'components';
import { SIZE } from 'constants';
import styles from './BurguerMenuButton.component.styles';
import BurguerIcon from '../../../../assets/All_Icons/basic/burguer_menu.svg';
import XBlackIcon from '../../../../assets/All_Icons/basic/x_grey.svg';
import UserIcon from '../../../../assets/All_Icons/user.svg';
import StoreIcon from '../../../../assets/All_Icons/store.svg';
import QRIcon from '../../../../assets/All_Icons/QR.svg';
import ExitIcon from '../../../../assets/All_Icons/exit.svg';
import InfoIcon from '../../../../assets/All_Icons/info.svg';
import MoveIconMenu from '../../../../assets/All_Icons/drag/MoveIconMenu.svg';

const MenuHeading = ({ onPress, heading, iconSVG }) => (
  <View style={styles.menu_section}>
    <TouchableIcon
      isWhiteBackground={true}
      onPress={() => onPress()}
      icon={(
        <View style={styles.menu_item_wrapper} >
          {iconSVG}
          <TypoGraphyOpenSans style={styles.menu_heading} text={heading} />
        </View>
      )}
    />
  </View>
);

MenuHeading.propTypes = {
  backgroundDark: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  heading: PropTypes.func.isRequired
};

export const BurguerMenuDisplay =({
  onPressClose,
  onPressSeeProfile,
  onPressCheckEmployees,
  onPressCheckRejectedProducts,
  onPressCloseSession,
  onPressSeeQRForm,
  onPressSeeBusiness,
  onPressEditDisplayOrder,
  displayImpersonateOption,
  onPressImpersonateUsers
}) => (

    <View style={styles.menu_container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.menu_close_wrapper}>
        </View>
        {MenuHeading({ onPress: () => onPressCloseSession(), heading: "Cerrar sesión", iconSVG: <ExitIcon {...SIZE.square_20} /> })}
        {MenuHeading({ onPress: () => onPressSeeQRForm(), heading: "Código QR", iconSVG: <QRIcon {...SIZE.square_20} /> })}
        {MenuHeading({ onPress: () => onPressSeeBusiness(), heading: "Mi establecimiento", iconSVG: <StoreIcon {...SIZE.square_20} /> })}
        {MenuHeading({ onPress: () => onPressSeeProfile(), heading: "Mi Cuenta", iconSVG: <UserIcon {...SIZE.square_20} /> })}
        {MenuHeading({ onPress: () => onPressEditDisplayOrder(), heading: "Mover Elementos", iconSVG: <MoveIconMenu {...SIZE.square_20} /> })}
        {MenuHeading({ onPress: () => Linking.openURL("https://www.ketepongo.com/legal/index.html"), heading: "Información Legal", iconSVG: <InfoIcon {...SIZE.square_20} /> })}

        {displayImpersonateOption && MenuHeading({ onPress: () => onPressImpersonateUsers(), heading: "Suplantar Usuarios", backgroundDark: true })}
        {/* {MenuHeading({ onPress: () => onPressCheckRejectedProducts(), heading: "Productos Rechazados" })} */}
      </SafeAreaView>
    </View>
  );

BurguerMenuDisplay.propTypes = {
  onPressClose: PropTypes.func.isRequired,
  onPressSeeProfile: PropTypes.func.isRequired,
  onPressCheckEmployees: PropTypes.func.isRequired,
  onPressCheckRejectedProducts: PropTypes.func.isRequired,
  onPressCloseSession: PropTypes.func.isRequired,
  onPressSeeQRForm: PropTypes.func.isRequired,
  onPressSeeBusiness: PropTypes.func.isRequired,
  onPressEditDisplayOrder: PropTypes.func.isRequired
};

export const TouchableBurguerMenu = ({ onPress }) => (
  <TouchableIcon
    isWhiteBackground={true}
    onPress={() => onPress()}
    icon={(
      <View style={styles.burguer_btn_container}>
        <BurguerIcon {...styles.burguer} />
        <TypoGraphyOpenSansSemiBold style={styles.menu} text={"Menú"} />
      </View>
    )}
  />
);

TouchableBurguerMenu.propTypes = {
  onPress: PropTypes.func.isRequired
};