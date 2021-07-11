import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, FONTSIZE } from 'constants';
import { TypoGraphyOpenSansLight, TypoGraphyOpenSansSemiBold } from 'components';

const NavigationLabel = ({ active, navigation }) => {
  const { routeName, routes } = navigation.state;
  const textStyle = (routes.length > 1 || !active) ? { ...styles.main, ...styles.light } : styles.main;

  if (routes.length > 1 || !active) {
    return <TypoGraphyOpenSansLight style={textStyle} text={routeName} />;
  }

  return <TypoGraphyOpenSansSemiBold style={textStyle} text={routeName} />;
};

const styles = StyleSheet.create({
  main: {
    color: COLORS.main,
    textAlign: 'center',
    ...FONTSIZE.extra_small,
    paddingBottom: 5,
    paddingTop: 5
  },
  light: {
    color: COLORS.neutral_light_medium,
  }
});

NavigationLabel.propTypes = {
  active: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
};

export { NavigationLabel };