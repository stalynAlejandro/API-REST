import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyNunitoBold = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.nunito_bold, ...style }} {...props}>{text}</Text>;
};

TypoGraphyNunitoBold.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};


export { TypoGraphyNunitoBold };
