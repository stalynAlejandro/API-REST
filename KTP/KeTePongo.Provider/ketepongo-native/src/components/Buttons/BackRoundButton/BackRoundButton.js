import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { SIZE } from 'constants';
import { TouchableIcon } from 'components';

import BackArrowIcon from '../../../../assets/All_Icons/arrows/back_main.svg';

const BackRoundButton = ({ onPressBack, btnStyle, iconSize }) => (
  <TouchableIcon
    onPress={() => onPressBack()}
    styles={{ ...styles.container, ...btnStyle }}
    icon={<BackArrowIcon {...(iconSize ? iconSize : SIZE.square_16)} />}
  />
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...SIZE.square_35,
    borderRadius: 30,
  }
});

BackRoundButton.propTypes = {
  onPressBack: PropTypes.func.isRequired,
  style: PropTypes.object,
  btnStyle: PropTypes.object,
  iconSize: PropTypes.object
};

export { BackRoundButton };