import React from 'react';
import PropTypes from 'prop-types';
import { TouchableIcon } from 'components';
import { SIZE } from 'constants';
import { StyleSheet } from "react-native";
import LeftArrowIcon from '../../../../assets/All_Icons/arrows/arrow_left_grey.svg';
const styles = StyleSheet.create({
  btn_wrapper: { 
    width: 30, 
    height: 30, 
    alignItems: 'center',
    justifyContent: 'center' 
  }
});
const BackGreyArrowButton = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    isWhiteBackground={true}
    styles={styles.btn_wrapper}
    icon={<LeftArrowIcon {...SIZE.square_15} />}
  />
);

BackGreyArrowButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export { BackGreyArrowButton };