import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TypoGraphyOpenSans, TouchableItem } from 'components';

import styles from './WatchWarningButton.component.styles';

import WarningWhiteIcon from '../../../../assets/displayIcon/warning_triangle_white.svg';

export const WatchWarningButton = ({ onPress }) => (
  <TouchableItem 
    onPress={() => onPress()}
    item={(
      <View style={styles.warning_wrapper}>
        <View style={styles.icon_wrapper}>
          <WarningWhiteIcon {...styles.warning_size} />
        </View>
        <TypoGraphyOpenSans style={styles.look_validate} text={"Ver"} />
      </View>
    )}
  />
);

WatchWarningButton.propTypes = {
  onPress: PropTypes.func.isRequired
};