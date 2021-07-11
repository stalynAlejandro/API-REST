import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TypoGraphyOpenSansSemiBold, TouchableItem } from 'components';

import styles from './ValidateButton.component.styles';

import RightArrowNoTail from '../../../../assets/arrows/right_arrow_no_tail.svg';

export const ValidateButton = ({ onPress }) => (
  <TouchableItem 
    onPress={() => onPress()}
    item={(
      <View style={styles.validate_wrapper}>
        <TypoGraphyOpenSansSemiBold style={styles.validate} text={"Validar"} />
        <RightArrowNoTail {...styles.arrow_size} />
      </View>
    )}
  />
);

ValidateButton.propTypes = { 
  onPress: PropTypes.func.isRequired
};
