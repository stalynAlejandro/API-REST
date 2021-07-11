import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BackRoundButton } from 'components';

import styles from './IconWithBackArrowButtonHeader.component.styles';

const IconWithBackArrowButtonHeader = ({ onPressBack, icon }) => (
    <View style={styles.container}>
      <View style={[styles.fillScreen, styles.back_arrow_wrapper]}>
        <BackRoundButton
          onPressBack={() => onPressBack()}
          btnStyle={styles.backButton}
          iconSize={styles.backButtonSize}
        />
      </View>

      <View style={styles.fillScreen}>
        {icon}
      </View>

      <View style={styles.fillScreen} />
    </View >
  );

IconWithBackArrowButtonHeader.propTypes = {
  onPressBack: PropTypes.func.isRequired,
  icon: PropTypes.any.isRequired
};

export { IconWithBackArrowButtonHeader };