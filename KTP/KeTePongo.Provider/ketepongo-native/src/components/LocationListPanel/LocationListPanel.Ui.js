import React from 'react';
import PropTypes from 'prop-types';
import { TouchableIcon } from 'components';

export const LocationChoice = ({
  onPress,
  buttonBackgoundStyle,
  locationId,
  locationName
}) => (
  <TouchableIcon
    onPress={() => onPress(locationId)}
    styles={buttonBackgoundStyle}
    icon={locationName}
  />
);

LocationChoice.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonBackgoundStyle: PropTypes.object.isRequired,
  locationId: PropTypes.number.isRequired,
  locationName: PropTypes.any.isRequired
};
