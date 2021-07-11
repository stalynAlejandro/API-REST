import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Image,
  Keyboard
} from 'react-native';
import { COLORS, SIZE } from 'constants';
import {
  TitleSectionWithLeftAndOptionalRightButton,
  BackGreyArrowButton,
  TypoGraphyOpenSansSemiBold,
  LongSquareButton,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  TouchableIcon,
} from 'components';
import { BottomShadowLine } from 'shared';

import styles from './EditProfileScreen.component.styles.js';
import XIcon from '../../../assets/All_Icons/basic/x_grey.svg';
import ArrowDownIcon from '../../../assets/All_Icons/arrows/arrow_down_noTail.svg';
import SearchIcon from '../../../assets/All_Icons/basic/search.svg';
import OpenEye from '../../../assets/All_Icons/basic/show_password.svg';
import CloseEye from '../../../assets/All_Icons/basic/hide_password.svg';

export const HelperTextWithLink = ({ heading, onPress }) => (
  <View style={styles.warningText_wrapper}>
    <TypoGraphyOpenSansLight
      style={styles.warningText}
      text={heading}
    />
    <TouchableIcon
      onPress={() => onPress()}
      icon={<TypoGraphyOpenSansBold style={styles.warningText_hight} text={"aquí."} />}
    />
  </View>
);

HelperTextWithLink.propTypes = {
  heading: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export const PasswordInput = ({
  placeholder,
  password,
  onChangeText,
  displayValue,
  onPressHide,
  onPressShow
}) => (
  <View style={styles.password_wrapper}>
    <TextInput
      style={{ ...styles.input_password, ...(!password? styles.input_empty : {}) }}
      placeholder={placeholder}
      secureTextEntry={displayValue}
      onChangeText={(password) => onChangeText(password)}
      value={password}
      blurOnSubmit={false}
      onSubmitEditing={Keyboard.dismiss}
    />

    {displayValue ?
      <TouchableIcon
        onPress={() => onPressHide()}
        icon={<OpenEye {...styles.icon_size} />}
      />
      :
      <TouchableIcon
        onPress={() => onPressShow()}
        icon={<CloseEye {...styles.icon_size} />}
      />
    }
  </View>
);

PasswordInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  password: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  displayValue: PropTypes.bool.isRequired,
  onPressHide: PropTypes.func.isRequired,
  onPressShow: PropTypes.func.isRequired,
};

export const InstructionForConfirmationCode = () => (
  <TypoGraphyOpenSansLight
    text={"Introduce el código que te acabamos de mandar al número que nos has indicado en el paso anterior. Esto puede tardar unos segundos."}
    style={styles.heading_confirmation_code}
  />
);

export const CountryPhoneCode = ({ country, onPressSelect }) => (
  <TouchableIcon
    onPress={() => onPressSelect(country)}
    icon={(
      <View style={styles.country_wrapper}>
        <Image source={{ uri: country.flag }} style={styles.flag}/>
        <TypoGraphyOpenSans text={`${country.name.spa} (+${country.callingCode})`} style={styles.country}/>
      </View>
    )}
  />
);

CountryPhoneCode.propTypes = {
  country: PropTypes.object.isRequired,
  onPressSelect: PropTypes.func.isRequired
};

export const CountrySelectionHeading = () => (
  <TypoGraphyOpenSansBold text={"SELECCIONA TU PAÍS"} style={styles.selection_country}/>
);

export const CountrySearch = ({ onChangeText }) => (
  <View style={styles.search_container}>
    <SearchIcon {...SIZE.square_14} style={styles.search_icon} />
    <TextInput
      style={styles.searchInput}
      type={"text"}
      placeholder={"Buscar País"}
      placeholderTextColor={COLORS.neutral_strong}
      onSubmitEditing={Keyboard.dismiss}
      onChangeText={(country) => onChangeText(country)} />
  </View>
);

CountrySearch.propTypes = {
  onChangeText: PropTypes.func.isRequired
};

export const HelperMessage = ({ message }) => (
  <TypoGraphyOpenSansLight style={styles.helper} text={message} />
);

HelperMessage.propTypes = {
  message: PropTypes.string
};

export const EditProfileButton = ({ btnText, onPress, userDataHasChange }) => (
  <LongSquareButton
    onPress={() => onPress()}
    disabled={!userDataHasChange}
    btnText={(
      <TypoGraphyOpenSansSemiBold text={btnText}
        style={!userDataHasChange ? styles.disabled_btn_text : styles.active_btn_text}
      />
    )}
    btnStyle={!userDataHasChange ? styles.disabled_btn : styles.active_btn}
  />
);

EditProfileButton.propTypes = {
  btnText: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  userDataHasChange: PropTypes.bool
};

const CountryCodeTouchable = ({ country, onPressChangeCountry }) => (
  <TouchableIcon
    onPress={() => onPressChangeCountry()}
    icon={(
      <View style={styles.country_selected_wrapper}>
        <TypoGraphyOpenSansBold style={styles.country_selected} text={`${country.countryCode} +${country.callingCode}`} />
        <ArrowDownIcon />
      </View>
    )}
  />
);

CountryCodeTouchable.propTypes = {
  country: PropTypes.object.isRequired,
  onPressChangeCountry: PropTypes.func.isRequired
};

const TouchableXIcon = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={<XIcon />}
  />
);

TouchableXIcon.propTypes = {
  onPress: PropTypes.func.isRequired
};

const EditInput = ({ value, onChangeText, keyboardType }) => (
  <TextInput
    onChangeText={(value) => onChangeText(value)}
    value={value}
    style={styles.input}
    keyboardType={keyboardType}
  />
);

EditInput.propTypes = {
  keyboardType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
};

export const EditPhoneInput = ({
  value,
  onChangeText,
  onPressChangeCountry,
  country,
  onPressX,
  keyboardType
}) => (
  <View style={styles.input_container}>
    <View style={styles.input_wrapper}>
      {CountryCodeTouchable({ country, onPressChangeCountry})}
      {EditInput({ value, onChangeText, keyboardType })}
      {TouchableXIcon({ onPress: () => onPressX() })}
    </View>
  </View>
);

EditPhoneInput.propTypes = {
  keyboardType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  country: PropTypes.object.isRequired,
  onPressX: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onPressChangeCountry: PropTypes.func,
  prefixOptions: PropTypes.string,
};

export const RegularInput = ({
  value,
  onChangeText,
  onPressX,
  keyboardType
}) => (
    <View style={styles.input_container}>
      <View style={styles.input_wrapper}>
        {EditInput({ value, onChangeText, keyboardType })}
        <TouchableXIcon onPress={onPressX } />
      </View>
    </View>
  );

RegularInput.propTypes = {
  keyboardType: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onPressX: PropTypes.func.isRequired
};

export const EditProfileHeading = ({ heading }) => (
  <TypoGraphyOpenSansSemiBold style={styles.heading} text={heading} />
);

EditProfileHeading.propTypes = {
  heading: PropTypes.string.isRequired
};

export const EditProfileScreenHeader = ({ title, onPressBack }) => {
  const sectionHeight = styles.header_height;
  const component = (
    <View>
      <TitleSectionWithLeftAndOptionalRightButton
        leftButton={<BackGreyArrowButton onPress={() => onPressBack()} />}
        headerText={title}
      />
    </View>
  );

  return BottomShadowLine({ sectionHeight, component });
};

EditProfileScreenHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onPressBack: PropTypes.func.isRequired,
};
