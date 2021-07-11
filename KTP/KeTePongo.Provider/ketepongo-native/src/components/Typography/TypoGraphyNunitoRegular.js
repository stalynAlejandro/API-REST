import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyNunitoRegular = ({ style, text, ...props }) => {
  return <Text style={{ ...TYPOGRAPHY.nunito_regular, ...style }} {...props}>{text}</Text>;
};

TypoGraphyNunitoRegular.propTypes = {
  style: PropTypes.object,
  text: PropTypes.any
};


export { TypoGraphyNunitoRegular };
