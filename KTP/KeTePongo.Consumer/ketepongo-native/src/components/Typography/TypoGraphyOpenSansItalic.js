import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyOpenSansItalic = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.openSans_italic, ...style }} {...props} >{text}</Text>;
};

TypoGraphyOpenSansItalic.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};

export { TypoGraphyOpenSansItalic };
