import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TypoGraphyOpenSans, TouchableIcon } from 'components';

import styles from './AcceptButton.component.styles';
import CheckIcon from '../../../../assets/All_Icons/basic/check_main.svg';

const AcceptButton = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={(
      <View style={styles.accept_wrapper}>
        <CheckIcon {...styles.accept_icon_size} style={styles.accept_icon} />
        <TypoGraphyOpenSans style={styles.accept} text={"Aceptar"} />
      </View>
    )}
  />
);

AcceptButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export { AcceptButton };