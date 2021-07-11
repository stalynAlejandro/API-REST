/* eslint-disable no-undef */
import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View
} from 'react-native';
import PropTypes from 'prop-types';

const onPressBtn = (onPress) => setTimeout(() => onPress(), .3);

const TouchableIcon = ({ onPress,isWhiteBackground = false, styles = null, icon, ...props }) => (
  Platform.OS === 'android' ?
    <TouchableNativeFeedback
      onPress={() => onPressBtn(onPress)}
      background={TouchableNativeFeedback.Ripple(isWhiteBackground?'#E4E4E4':'white')}
      {...props}
    >
      <View style={{ ...styles }}>
        {icon}
      </View>
    </TouchableNativeFeedback>
    :
    <TouchableOpacity
      style={{ ...styles }}
      onPress={() => onPressBtn(onPress)}
      {...props}
    >
      {icon}
    </TouchableOpacity>
);

TouchableIcon.propTypes = {
  onPress: PropTypes.func,
  styles: PropTypes.object,
  icon: PropTypes.any,
  selectedProperty: PropTypes.any,
  props: PropTypes.object
};

export { TouchableIcon };
