/* eslint-disable semi */
import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyOpenSansLight = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.openSans_light, ...style }} {...props}>{text}</Text>;
};

TypoGraphyOpenSansLight.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};

export { TypoGraphyOpenSansLight };
