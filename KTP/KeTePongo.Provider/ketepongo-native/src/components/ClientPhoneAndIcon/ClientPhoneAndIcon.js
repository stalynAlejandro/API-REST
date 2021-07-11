import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';
import { TypoGraphyOpenSansLight } from 'components';

import PhoneBlackIcon from '../../../assets/displayIcon/phone_black.svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  phone: {
    color: COLORS.neutral_super_strong,
    ...FONTSIZE.normal,
    marginLeft: 5
  }
});

const ClientPhoneAndIcon = ({ phone }) => (
  <View style={styles.container}>
    <PhoneBlackIcon />
    <TypoGraphyOpenSansLight text={phone} style={styles.phone} />
  </View>
);

ClientPhoneAndIcon.propTypes = {
  phone: PropTypes.number.isRequired
};

export { ClientPhoneAndIcon };