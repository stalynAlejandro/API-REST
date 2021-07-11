import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyOpenSansBold = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.openSans_bold, ...style }} {...props}>{text}</Text>;
};

TypoGraphyOpenSansBold.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};

export { TypoGraphyOpenSansBold };
