import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform } from 'react-native';
import { TouchableIcon } from 'components';
import { COLORS } from 'constants';

const LongSquareButton = ({ btnText, onPress, btnStyle, disabled , isWhiteBackground=false}) => (
  <TouchableIcon
    styles={{...styles.btn_wrapper,...btnStyle}}
    disabled={disabled}
    onPress={onPress}
    icon={btnText}
    isWhiteBackground={isWhiteBackground}
  />
);

const styles = StyleSheet.create({
  btn_wrapper: {
    width: '100%',
    height: 48,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
    backgroundColor: COLORS.secondary,
    color: COLORS.neutral_min,
    lineHeight: 20
  },
});

LongSquareButton.propTypes = {
  disabled: PropTypes.bool,
  btnText: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  btnStyle: PropTypes.object
};

export { LongSquareButton };