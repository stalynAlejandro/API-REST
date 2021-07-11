import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  DefaultButton,
  TypoGraphyOpenSansBold
} from 'components';

import styles from './LinkProductButton.component.styles';

import LinkIcon from '../../../../assets/displayIcon/link.svg';

const LinkProductButton = ({ onPress }) => (
  <DefaultButton
    onPress={() => onPress()}
    btnStyle={styles.link_btn_container}
    btnText={(
      <View style={styles.btn_wrapper}>
        <LinkIcon style={styles.icon} {...styles.link_icon_size} />
        <TypoGraphyOpenSansBold text={"ENLAZAR PRODUCTO"} style={styles.link} />
      </View>
    )}
  />
);

LinkProductButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export { LinkProductButton };
