import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { TouchableIcon, TypoGraphyOpenSans } from 'components';

import styles from './AuthUserForm.component.styles';

export const LoginHelper = ({ onPress, hasError }) => (
  <View style={{...styles.helper_text_wrapper,...(hasError?styles.helper_text_wrapper_with_margin:{})}}>
    <Text style={styles.helper_text}>¿Olvidaste tu contraseña? Haz click</Text>
    <TouchableIcon
      onPress={() => onPress()}
      icon={<Text style={styles.helper_highlight}> aquí </Text>}
    />
    <Text style={styles.helper_text}>para recuperarla.</Text>
    <View style={styles.fillScreen} />
  </View>
);

LoginHelper.propTypes = {
  onPress: PropTypes.func.isRequired
};
