import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';
import { TypoGraphyOpenSansLight } from 'components';

import MainBlackIcon from '../../../assets/displayIcon/mail_black.svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  email: {
    color: COLORS.neutral_super_strong,
    ...FONTSIZE.normal,
    marginLeft: 5
  }
});

const ClientEmailAndIcon = ({ email }) => (
  <View style={styles.container}>
    <MainBlackIcon />
    <TypoGraphyOpenSansLight text={email} style={styles.email} />
  </View>
);

ClientEmailAndIcon.propTypes = {
  email: PropTypes.string.isRequired
};

export { ClientEmailAndIcon };