import React from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

const TouchableHighlightIcon = ({ onPress, styles, icon, selectedProperty, ...props }) => (
  <TouchableHighlight
    style={{ ...styles }}
    onPress={() => onPress(selectedProperty)}
    {...props}
  >
    {icon}
  </TouchableHighlight>
);

TouchableHighlightIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  props: PropTypes.object,
  styles: PropTypes.object,
  icon: PropTypes.any,
  selectedProperty: PropTypes.any
};

export { TouchableHighlightIcon };
