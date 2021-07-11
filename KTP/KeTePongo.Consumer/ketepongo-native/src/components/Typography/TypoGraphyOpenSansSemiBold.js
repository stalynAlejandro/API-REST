import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyOpenSansSemiBold = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.openSans_semi_bold, ...style }} {...props}>{text}</Text>;
};

TypoGraphyOpenSansSemiBold.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};


export { TypoGraphyOpenSansSemiBold };
