import React from 'react';
import PropTypes from 'prop-types';
import { SIZE, COLORS, STRINGS } from 'constants';
import { BottomShadowLine } from 'shared';
import {
  View,
  TextInput,
  ScrollView
} from 'react-native';
import {
  TouchableIcon,
  TypoGraphyOpenSans,
  TitleSectionWithLeftAndOptionalRightButton,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansBold,
  AcceptButton,
  BackGreyArrowButton
} from 'components';

import styles from './EmployeeListScreen.component.styles';
import SearchIcon from '../../../assets/All_Icons/basic/search.svg';
import UserIcon from '../../../assets/All_Icons/basic/user_icon.svg';
import MailIcon from '../../../assets/All_Icons/basic/mail.svg';
import PhoneIcon from '../../../assets/All_Icons/basic/phone.svg';
import TrashIcon from '../../../assets/All_Icons/basic/TrashCircle.svg';
import EditIcon from '../../../assets/All_Icons/basic/editCircle.svg';
import EmployeeIcon from '../../../assets/All_Icons/basic/employee.svg';
import AdminIcon from '../../../assets/All_Icons/basic/admin.svg';
import AddEmployeeIcon from '../../../assets/All_Icons/basic/add_employee.svg';

const RenderError = ({ isValidated }) => {
  if (isValidated) {
    return null;
  }

  return (
    <View style={styles.warning_container}>
      <TypoGraphyOpenSansLight style={styles.warning_message} text={"Usuario pendiente de validación"} />
    </View>
  );
};

RenderError.propTypes = {
  isValidated: PropTypes.bool.isRequired
};

const RenderRole = ({ role }) => {
  if (role === STRINGS.employee) {
    return (
      <View style={styles.employee_icon_and_role}>
        <EmployeeIcon />
        <TypoGraphyOpenSansBold style={styles.card_role} text={"Empleado"} />
      </View>
    );
  }

  return (
    <View style={styles.employee_icon_and_role}>
      <AdminIcon />
      <TypoGraphyOpenSansBold style={styles.card_role} text={"Administrador"} />
    </View>
  );
};

RenderRole.propTypes = {
  role: PropTypes.string.isRequired
};

const EmployeeCard = ({
  employee,
  onPressEdit,
  onPressDelete,
}) => {
  const {
    name,
    email,
    telephone,
    id,
    isValidated,
    role
  } = employee;

  return (
    <View style={{ ...styles.employee_card, ...(isValidated ? {} : styles.notValid) }} key={`${name}-${id}`}>
      <View style={styles.card_section}>
        <View style={styles.employee_icon_and_value_wrapper}>
          <UserIcon {...SIZE.square_14} />
          <TypoGraphyOpenSansSemiBold style={styles.card_info} text={name} />
        </View>
        <TouchableIcon onPress={() => onPressDelete(id)} icon={<TrashIcon />} />
      </View>

      <View style={styles.card_section}>
        <View style={styles.employee_icon_and_value_wrapper}>
          <MailIcon {...SIZE.square_14} />
          <TypoGraphyOpenSans style={styles.card_info} text={email} />
        </View>
      </View>

      <View style={styles.card_bottom_section}>
        <View style={styles.card_section}>
          <View style={styles.employee_icon_and_value_wrapper}>
            <PhoneIcon {...SIZE.square_14} />
            <TypoGraphyOpenSans style={styles.card_info} text={telephone} />
          </View>

          {RenderRole({ role })}

          <View>
            <TouchableIcon onPress={() => onPressEdit(employee)} icon={<EditIcon />} />
          </View>
        </View>
        {RenderError({ isValidated })}
      </View>
    </View>
  );
};

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
  onPressEdit: PropTypes.func.isRequired,
  onPressDelete: PropTypes.func.isRequired
};

export const EmployeeScrollList = ({
  list,
  onPressEdit,
  onPressDelete
}) => (
    <ScrollView style={styles.scrollView}>
      {list.map((employee) => (
        EmployeeCard({
          employee,
          onPressEdit,
          onPressDelete
        })
      ))
      }
    </ScrollView>
  );

EmployeeScrollList.propTypes = {
  list: PropTypes.array.isRequired,
  onPressEdit: PropTypes.func.isRequired,
  onPressDelete: PropTypes.func.isRequired
};

const UserSearchBar = ({ onChangeText, userName }) => (
  <View style={styles.search_wrapper}>
    <SearchIcon {...SIZE.square_17} style={styles.search_icon} />
    <TextInput
      onChangeText={(userName) => onChangeText(userName)}
      style={styles.search_input}
      placeholderTextColor={COLORS.neutral_strong}
      value={userName}
    />
  </View>
);

UserSearchBar.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  userName: PropTypes.string
};

export const EmployeeListScreenHeader = ({
  onPressBack,
  onPressAccept,
  onChangeText,
  userName
}) => {
  const component = (
    <View>
      <TitleSectionWithLeftAndOptionalRightButton
        leftButton={<BackGreyArrowButton onPress={() => onPressBack()} />}
        headerText={"Editar Usuario"}
        rightButton={<AcceptButton onPress={() => onPressAccept()} />}
      />
      <UserSearchBar onChangeText={(userName) => onChangeText(userName)} userName={userName} />
    </View>
  );

  return BottomShadowLine({ component });
};

EmployeeListScreenHeader.propTypes = {
  userName: PropTypes.string,
  onPressBack: PropTypes.func.isRequired,
  onPressAccept: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired
};

export const AddEmployeeButton = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={<AddEmployeeIcon {...SIZE.square_55} />}
  />
);

AddEmployeeButton.propTypes = {
  onPress: PropTypes.func.isRequired
};
