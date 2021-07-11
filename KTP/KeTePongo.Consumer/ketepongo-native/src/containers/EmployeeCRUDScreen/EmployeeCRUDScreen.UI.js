import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { SIZE } from 'constants';
import { BottomShadowLine } from 'shared';
import {
  TouchableIcon,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSans
} from 'components';

import styles from './EmployeeCRUDScreen.component.styles';
import UserIcon from '../../../assets/All_Icons/basic/user_icon.svg';
import MailIcon from '../../../assets/All_Icons/basic/mail.svg';
import PhoneIcon from '../../../assets/All_Icons/basic/phone.svg';
import LeftArrowIcon from '../../../assets/All_Icons/arrows/arrow_left_grey.svg';
import XIcon from '../../../assets/All_Icons/basic/x_grey.svg';
import CheckIcon from '../../../assets/All_Icons/basic/check_main.svg';
import EmployeeSelectedIcon from '../../../assets/All_Icons/basic/employee_white.svg';
import EmployeeIcon from '../../../assets/All_Icons/basic/employee_white.svg';
import AdminSelectedIcon from '../../../assets/All_Icons/basic/admin_white.svg';
import AdminIcon from '../../../assets/All_Icons/basic/admin_grey.svg';

export const AdminSelectedTouchable = ({ onPress }) => (
  <View style={styles.role_container}>
    <TouchableIcon
      styles={styles.unselected_container}
      onPress={() => onPress()}
      icon={(
        <View style={styles.unselected_role_wrapper}>
          <EmployeeIcon />
          <TypoGraphyOpenSans text={"Usuario"} style={styles.role_unselected} />
          <TypoGraphyOpenSansLight text={"Capaces de tramitar pedidos para tu comercio."} style={styles.role_unselected_description} />
        </View>
      )}
    />
    <View style={styles.selected_role_wrapper}>
      <AdminSelectedIcon />
      <TypoGraphyOpenSansBold text={"Administrador"} style={styles.role_selected} />
      <TypoGraphyOpenSansLight text={"Para tener completa libertad y permisos en la app."} style={styles.role_selected_description} />
    </View>
  </View>
);

AdminSelectedTouchable.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const EmployeeSelectedTouchable = ({ onPress }) => (
  <View style={styles.role_container}>
    <View style={{ ...styles.selected_role_wrapper, ...styles.adjust_border_to_left }}>
      <EmployeeSelectedIcon />
      <TypoGraphyOpenSansBold text={"Usuario"} style={styles.role_selected} />
      <TypoGraphyOpenSansLight text={"Capaces de tramitar pedidos para tu comercio."} style={styles.role_selected_description} />
    </View>
    <TouchableIcon
      styles={{...styles.unselected_container, ...styles.adjust_border_to_right }}
      onPress={() => onPress()}
      icon={(
        <View style={styles.unselected_role_wrapper}>
          <AdminIcon />
          <TypoGraphyOpenSans text={"Administrador"} style={styles.role_unselected} />
          <TypoGraphyOpenSansLight text={"Para tener completa libertad y permisos en la app."} style={styles.role_unselected_description} />
        </View>
      )}
    />
  </View>
);

EmployeeSelectedTouchable.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const OkButton = ({ onPress, btnText }) => (
  <View style={styles.btn}>
    <TouchableIcon
      onPress={() => onPress()}
      icon={<CheckIcon {...SIZE.square_24} style={styles.icon} />}
    />
    <TypoGraphyOpenSans styles={styles.cancel} text={btnText} />
  </View>
);

OkButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired
};

export const CancelButton = ({ onPressCancel }) => (
  <View style={styles.btn}>
    <TouchableIcon
      onPress={() => onPressCancel()}
      icon={<XIcon {...SIZE.square_24} style={styles.icon} />}
    />
    <TypoGraphyOpenSans styles={styles.cancel} text={"Cancelar"} />
  </View>
);

CancelButton.propTypes = {
  onPressCancel: PropTypes.func.isRequired
};

export const EmployeeRollHeading = () => (
  <View style={styles.roll_heading_wrapper}>
    <TypoGraphyOpenSansSemiBold style={styles.heading} text={"Elige un rol para esta persona"} />
    <TypoGraphyOpenSansLight style={styles.secondary_heading} text={"Podrás modificar este parámetro cuando lo necesites."} />
  </View>
);

const IconWithTextInput = (
  icon,
  value,
  placeHolder,
  onChange
) => (
    <View style={styles.input_row}>
      <View style={styles.icon_wrapper}>
        {icon}
      </View>
      <TextInput
        onChange={(text) => onChange(text)}
        placeHolder={placeHolder ? placeHolder : ''}
        value={value}
        style={styles.input}
      />
    </View>
  );

IconWithTextInput.propTypes = {
  icon: PropTypes.any.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const EmployeeBasicInformationInputs = ({
  name,
  email,
  telephone,
  onChangeName,
  onChangeEmail,
  onChangeTelephone
}) => (
    <View style={styles.main_info_wrapper}>
      {IconWithTextInput(<UserIcon {...SIZE.square_20} />, name, "nombre", onChangeName)}
      {IconWithTextInput(<MailIcon {...SIZE.square_20} />, email, "email", onChangeEmail)}
      {IconWithTextInput(<PhoneIcon {...SIZE.square_20} />, telephone, "telefono", onChangeTelephone)}
    </View>
  );

EmployeeBasicInformationInputs.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangeTelephone: PropTypes.func.isRequired,
};

export const EmployeeCRUDHeader = ({ headerText, onPressBackArrow }) => {

  const sectionHeight = styles.header_height;
  const component = (
    <View style={styles.header_wrapper}>
      <View style={styles.section}>
        <TouchableIcon
          onPress={() => onPressBackArrow()}
          icon={<LeftArrowIcon {...SIZE.square_15} />}
        />
      </View>
      <View style={styles.section_heading}>
        <TypoGraphyOpenSansBold style={styles.main_heading} text={headerText} />
      </View>
      <View style={styles.section} />
    </View>
  );

  return BottomShadowLine({ sectionHeight, component });
};

EmployeeCRUDHeader.propTypes = {
  onPressBackArrow: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired
};