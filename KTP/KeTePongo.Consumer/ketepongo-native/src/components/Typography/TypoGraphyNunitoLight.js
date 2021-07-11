import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyNunitoLight = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.nunito_light, ...style }} {...props}>{text}</Text>;
};

TypoGraphyNunitoLight.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};


export { TypoGraphyNunitoLight };
