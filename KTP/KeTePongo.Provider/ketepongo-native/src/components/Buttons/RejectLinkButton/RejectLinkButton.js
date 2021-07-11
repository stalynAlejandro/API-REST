import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  DefaultButton,
  TypoGraphyOpenSansBold
} from 'components';

import styles from './RejectLinkButton.component.styles';

import NotLinkIcon from '../../../../assets/displayIcon/notLink_grey.svg';

const RejectLinkButton = ({ onPress }) => (
  <DefaultButton
    onPress={() => onPress()}
    btnStyle={styles.reject_btn_container}
    btnText={(
      <View style={styles.btn_wrapper}>
        <NotLinkIcon style={styles.icon} />
        <TypoGraphyOpenSansBold text={"RECHAZAR"} style={styles.reject} />
      </View>
    )}
  />
);

RejectLinkButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export { RejectLinkButton };
