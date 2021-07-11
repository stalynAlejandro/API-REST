import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import {
  TitleSectionWithLeftAndOptionalRightButton,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold,
  AcceptButton,
  TypoGraphyOpenSans,
  TouchableIcon,
  LongSquareButton,
  TypoGraphyOpenSansBold,
  BackGreyArrowButton
} from 'components';
import { BottomShadowLine } from 'shared';

import styles from './ProfileScreen.component.styles';
import LockYellow from '../../../assets/All_Icons/basic/lock_yellow.svg';
import XRedIcon from '../../../assets/All_Icons/basic/x_red.svg';
import PencilEdit from '../../../assets/All_Icons/basic/pencil_grey.svg';

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

export const ConfirmPhoneChangedWarning = ({ onPress }) => (
  <View style={styles.phone_change_alert_wrapper}>
    <TypoGraphyOpenSans text={"ATENCIÓN"} style={styles.alert_color_size} />
    <TypoGraphyOpenSans text={"Te hemos enviado un SMS, introduce el código."} style={styles.alert_color_size} />
    <TypoGraphyOpenSans text={"(prueba: 000111)"} style={styles.alert_color_size} />
    {OkButton({ onPress })}
  </View>
);

export const ConfirmPhoneChangedWarningSuccess = ({ onPress }) => (
  <View style={styles.phone_change_alert_wrapper}>
    <TypoGraphyOpenSans text={"¡ENHORABUENA!"} style={styles.alert_color_size} />
    <TypoGraphyOpenSans text={"Tu número de teléfono se ha modificado correctamente."} style={styles.alert_color_size} />
  
    {OkButton({ onPress })}
  </View>
);

ConfirmPhoneChangedWarning.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const VerificationRequiredWarning = ({ onPress, email }) => (
  <View style={styles.verification_container}>
    <View>
      <TypoGraphyOpenSans text={"Hemos enviado un correo a "} style={styles.verification_text} />
      <TypoGraphyOpenSansSemiBold text={email} style={styles.verification_text}/>
      <TypoGraphyOpenSans text={" con un código de validación."} style={styles.verification_text} />
    </View>

    <View style={styles.verification_middle}>
      <TypoGraphyOpenSans text={"Verifícalo en menos de 24 h para terminar la modificación."} style={styles.verification_text} />
    </View>

    {OkButton({ onPress })}
  </View>
);

VerificationRequiredWarning.propTypes = {
  onPress: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
};
export const ChangeConfirmation = ({ onPress, userName }) => (
  <View style={styles.verification_container}>
    <View>
      <TypoGraphyOpenSans text={"Has cambiado tu nombre de usuario a "} style={styles.verification_text} />
      <TypoGraphyOpenSansSemiBold text={userName} style={styles.verification_text}/>
      <TypoGraphyOpenSans text={" con éxito."} style={styles.verification_text} />
    </View>
    <View style={styles.verification_middle}>
      <TypoGraphyOpenSans text={""} style={styles.verification_text} />
    </View>
    {OkButton({ onPress })}
  </View>
);
ChangeConfirmation.propTypes = {
  onPress: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};
export const PasswordChangeConfirmation = ({ onPress }) => (
  <View style={styles.verification_container}>
    <View>
      <TypoGraphyOpenSans text={"Has cambiado tu contraseña con éxito"} style={styles.verification_text} />
      <TypoGraphyOpenSansSemiBold text={""} style={styles.verification_text}/>
      <TypoGraphyOpenSans text={""} style={styles.verification_text} />
    </View>
    <View style={styles.verification_middle}>
      <TypoGraphyOpenSans text={""} style={styles.verification_text} />
    </View>
    {OkButton({ onPress })}
  </View>
);

PasswordChangeConfirmation.propTypes = {
  onPress: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};

export const CloseAccountTouchable = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={(
      <View style={styles.lock_wrapper}>
        <XRedIcon style={styles.icon} {...styles.icon_size} />
        <TypoGraphyOpenSans text={"Cerrar Cuenta"} style={styles.close_account}/>
      </View>
    )}
  />
);

CloseAccountTouchable.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const ChangePasswordTouchable = ({ onPress }) => (
  <TouchableIcon
  isWhiteBackground={false}
    onPress={() => onPress()}
    icon={(
      <View style={styles.change_password_wrapper}>
        <LockYellow style={styles.icon} />
        <TypoGraphyOpenSans text={"Cambiar Contraseña"} style={styles.change_password}/>
      </View>
    )}
  />
);

ChangePasswordTouchable.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const UserDetail = ({
  heading,
  userDetail,
  onPress
}) => (
  <View>
    <TypoGraphyOpenSansBold text={heading} style={styles.input_heading} />
    <TouchableIcon
      onPress={() => onPress()}
      icon={
     <View style={{flex:1,flexDirection:'row'}}>
        <TypoGraphyOpenSans text={userDetail} style={styles.userDetail} />
        <PencilEdit style={{marginLeft:-12}}/>
        </View>
    }
    />
  </View>
);

UserDetail.propTypes = {
  onPress: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  userDetail: PropTypes.string.isRequired,
};

export const UserDetailTouchableWithHelper = ({
  heading,
  userDetail,
  onPress,
  helperText
}) => (
  <View style={styles.user_detail_container}>
    {UserDetail({ heading, userDetail, onPress })}
    <TypoGraphyOpenSansLight text={helperText} style={styles.helper} />
  </View>
);

UserDetailTouchableWithHelper.propTypes = {
  onPress: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  userDetail: PropTypes.string.isRequired,
};


export const UserDetailTouchable = ({
  heading,
  userDetail,
  onPress
}) => (
  <View style={styles.user_detail_container}>
    {UserDetail({ heading, userDetail, onPress })}
  </View>
);

UserDetailTouchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  userDetail: PropTypes.string.isRequired,
};

export const LongInput = ({
  heading,
  onChangeText,
  value
}) => (
  <View style={styles.long_input_wrapper}>
    <TypoGraphyOpenSansLight text={heading} styles={styles.input_heading} />
    <TextInput
      onChangeText={() => onChangeText()}
      value={value}
      style={styles.input}
    />
  </View>
);

LongInput.propTypes = {
  heading: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export const AdminUserHeading = () => (
  <TypoGraphyOpenSansBold text={"Datos del usuario"} style={styles.heading} />
);

export const EmployeeUserHeading = ({ tradeName }) => (
  <TypoGraphyOpenSansSemiBold text={tradeName} style={styles.employee_heading} />
);

EmployeeUserHeading.propTypes = {
  tradeName: PropTypes.string.isRequired
};

export const ShortInput = ({
  heading,
  onChangeText,
  value,
  keyboardType
}) => (
  <View style={styles.short_input_wrapper}>
    <TypoGraphyOpenSansLight text={heading} styles={styles.input_heading} />
    <TextInput
      onChangeText={() => onChangeText()}
      value={value}
      style={styles.input}
      keyboardType={keyboardType ? keyboardType : 'default'}
    />
  </View>
);

ShortInput.propTypes = {
  heading: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.string
};

export const LongInputWithDoubleHeight = ({
  heading,
  onChangeText,
  value
}) => (
  <View style={styles.double_long_input_wrapper}>
    <TypoGraphyOpenSansLight text={heading} styles={styles.input_heading} />
    <TextInput
      multiline={true}
      numberOfLines={2}
      textAlignVertical={'top'}
      onChangeText={() => onChangeText()}
      value={value}
      style={styles.double_long_input}
    />
  </View>
);

LongInputWithDoubleHeight.propTypes = {
  heading: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export const ProfileScreenHeader = ({ onPressBack, onPressAccept }) => {
  const sectionHeight = styles.header_height;
  const component = (
    <TitleSectionWithLeftAndOptionalRightButton
      leftButton={<BackGreyArrowButton onPress={() => onPressBack()} />}
      headerText={"Editar Perfil"}
    />
  );

  return BottomShadowLine({ sectionHeight, component });
};

ProfileScreenHeader.propTypes = {
  userName: PropTypes.string,
  onPressBack: PropTypes.func.isRequired,
  onPressAccept: PropTypes.func.isRequired,
};