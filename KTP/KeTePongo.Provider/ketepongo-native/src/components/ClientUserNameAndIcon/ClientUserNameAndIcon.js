import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';
import { TypoGraphyOpenSansLight } from 'components';

import UserBlackIcon from '../../../assets/displayIcon/user_black.svg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    color: COLORS.neutral_super_strong,
    ...FONTSIZE.normal,
    marginLeft: 5
  }
});

const ClientUserNameAndIcon = ({ name }) => (
  <View style={styles.container}>
    <UserBlackIcon />
    <TypoGraphyOpenSansLight text={name} style={styles.name} />
  </View>
);

ClientUserNameAndIcon.propTypes = {
  name: PropTypes.string.isRequired
};

export { ClientUserNameAndIcon };