import React from 'react';
import { Text } from 'react-native';
import { TYPOGRAPHY } from 'constants';
import PropTypes from 'prop-types';

const TypoGraphyOpenSansWithHighlight = ({ style, text, highlightText, secondText, ...props }) => {
  return (
    <Text style={{ ...TYPOGRAPHY.openSans_light, ...style }} {...props}>
      {text}
      <Text style={{ ...TYPOGRAPHY.openSans_semi_bold, ...style}}>{highlightText}</Text>
      {secondText}
    </Text>
  );
};

TypoGraphyOpenSansWithHighlight.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  highlightText: PropTypes.string,
  secondText: PropTypes.string,
};


export { TypoGraphyOpenSansWithHighlight };
