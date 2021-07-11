import React from 'react';
import PropTypes from 'prop-types';
import { 
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
 } from 'react-native';

const onPressBtn = (onPress, selectedProperty) => (
  // eslint-disable-next-line no-undef
  setTimeout(() => {
    onPress(selectedProperty);
  }, .3)
);

const TouchableItem = ({ onPress, item, selectedProperty, ...props }) => (
  Platform.OS === 'android' ?
    <TouchableNativeFeedback
      onPress={() => onPressBtn(onPress, selectedProperty)}
      background={TouchableNativeFeedback.Ripple('white')}
    >
    {item}
    </TouchableNativeFeedback>
    :
    <TouchableOpacity 
      onPress={() => onPressBtn(onPress, selectedProperty)}
      {...props}
    >
      {item}
    </TouchableOpacity>
);

TouchableItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.any,
  selectedProperty: PropTypes.any,
  props: PropTypes.object
};

export { TouchableItem };