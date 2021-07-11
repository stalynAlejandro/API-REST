import React from 'react';
import { View } from 'react-native';
import { TouchableIcon } from 'components';
import PropTypes from 'prop-types';

import styles from './AuthHeader.component.styles';
import BackWhiteArrow from '../../../assets/All_Icons/arrows/back_white_arrow.svg';
import KetepongoLogo from '../../../assets/All_Icons/logos/LogoKTPhorizontal.svg';

const AuthHeader = ({ onPressBack }) => (
  <View style={styles.header_wrapper}>
    <View style={styles.header_section}>
      <TouchableIcon
        isWhiteBackground={true}
        styles={styles.back_arrow_wrapper}
        onPress={() => onPressBack()}
        icon={<BackWhiteArrow {...styles.back_arrow} />}
      />
    </View>
    <View style={styles.header_logo_wrapper}>
      <KetepongoLogo {...styles.header_logo} />
    </View>
    <View style={styles.header_section} />
  </View>
);

AuthHeader.propTypes = {
  onPressBack: PropTypes.func.isRequired
};

export { AuthHeader };
