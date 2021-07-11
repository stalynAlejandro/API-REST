import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TypoGraphyOpenSansSemiBold, TouchableItem } from 'components';

import styles from './WatchButton.component.styles';

import RightArrowNoTailGrey from '../../../../assets/arrows/right_arrow_no_tail_grey.svg';

export const WatchButton = ({ onPress }) => (
  <TouchableItem 
    onPress={() => onPress()}
    item={(
      <View style={styles.validate_wrapper}>
        <TypoGraphyOpenSansSemiBold style={styles.look_text} text={"Ver"} />
        <RightArrowNoTailGrey {...styles.arrow_size} />
      </View>
    )}
  />
);

WatchButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};