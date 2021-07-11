import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { TypoGraphyOpenSansSemiBold, TouchableIcon } from 'components';

import styles from './MainButton.component.styles';
import PlusWhiteIcon from '../../../../assets/All_Icons/symbols/plus_white.svg';

const MainButton = ({ onPressButton, buttonText, isSecondary }) => (
  <TouchableIcon
    styles={isSecondary?{...styles.btn_wrapper, ...styles.btn_wrapper_secondary}: styles.btn_wrapper}
    onPress={() => onPressButton()}
    icon={(
      <View style={styles.container}>
        <PlusWhiteIcon {...styles.plus_icon} />
        <View style={styles.heading_wrapper}>
          <TypoGraphyOpenSansSemiBold style={styles.heading} text={buttonText} />
        </View>
      </View>
    )}
  />
);

MainButton.propTypes = {
  onPressButton: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export { MainButton };
