import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from 'constants';

const styles = StyleSheet.create({
  btn_wrapper: {
    width: '100%',
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const DefaultButton = ({ onPress, btnText, btnStyle, disabled }) => (
  <TouchableOpacity
    disabled={disabled ? disabled : false}
    onPress={onPress}
    style={{ ...styles.btn_wrapper, ...btnStyle }}
  >
    {btnText}
  </TouchableOpacity>
);

DefaultButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  btnText: PropTypes.any,
  btnStyle: PropTypes.object,
  disabled: PropTypes.bool
};

export { DefaultButton };