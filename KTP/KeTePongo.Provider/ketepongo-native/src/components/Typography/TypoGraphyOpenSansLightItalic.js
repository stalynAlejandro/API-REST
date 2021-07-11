/* eslint-disable semi */
import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyOpenSansLightItalic = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.openSans_light_italic, ...style }} {...props}>{text}</Text>;
};

TypoGraphyOpenSansLightItalic.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};

export { TypoGraphyOpenSansLightItalic };
