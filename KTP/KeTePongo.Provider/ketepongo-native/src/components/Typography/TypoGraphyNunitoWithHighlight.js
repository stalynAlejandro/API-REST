import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyNunitoWithHighlight = ({ style, text, highlightText, secondText, ...props }) => {
  return (
    <Text style={{ ...TYPOGRAPHY.nunito_regular, ...style }} {...props}>
      {text}
      <Text style={{ ...TYPOGRAPHY.nunito_bold, ...style}}>{highlightText}</Text>
      {secondText}
    </Text>
  );
};

TypoGraphyNunitoWithHighlight.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  highlightText: PropTypes.string,
  secondText: PropTypes.string,
};


export { TypoGraphyNunitoWithHighlight };
