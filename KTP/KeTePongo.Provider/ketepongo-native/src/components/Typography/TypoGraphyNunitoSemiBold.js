import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyNunitoSemiBold = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.nunito_semi_bold, ...style }} {...props}>{text}</Text>;
};

TypoGraphyNunitoSemiBold.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};


export { TypoGraphyNunitoSemiBold };
