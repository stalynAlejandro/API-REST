import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { COLORS } from 'constants';

const ConditionalBackground = ({ 
  isValid, 
  component,
  notValidBackgroundColor 
}) => {

  if (isValid) {
    return <View>{component}</View>;
  }

  return (
    <View style={{ 
      backgroundColor: COLORS.KO_hot_medium, 
      ...(notValidBackgroundColor? notValidBackgroundColor: {}) 
      }}>
      {component}
    </View>
  );
};

ConditionalBackground.propTypes = {
  isValid: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired,
  notValidBackgroundColor: PropTypes.object
}

export { ConditionalBackground };