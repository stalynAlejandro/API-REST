import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { TypoGraphyOpenSansBold } from 'components';
import { HEIGHT } from 'constants';

import styles from './LocationListPanel.component.styles';
import { LocationChoice } from './LocationListPanel.Ui';

class LocationListPanel extends React.PureComponent {
  renderColumnWithRow = (location) => {
    const { onSelectLocation, selectedList, styles } = this.props;
    let [buttonBackgoundStyle, buttonTextStyle] = [styles.option, styles.location_name];

    if (selectedList.includes(location.id)) {
      buttonBackgoundStyle = {
        ...styles.option,
        ...styles.selected
      };
      buttonTextStyle = {
        ...styles.location_name,
        ...styles.selected_name
      };
    }
    
    const locationName = <TypoGraphyOpenSansBold numberOfLines={2} ellipsizeMode="tail" style={buttonTextStyle} text={location.name.toUpperCase()} />;
    
    return (
      <LocationChoice
        key={`${locationName}${location.id}`}
        onPress={(locationId) => onSelectLocation(locationId)}
        buttonBackgoundStyle={buttonBackgoundStyle}
        locationId={location.id}
        locationName={locationName}
      />
    );
  }

  render() {
    const { locationDisplayHeight, list } = this.props;

    const numberOfRows = Math.floor(locationDisplayHeight / HEIGHT.locationRow);

    if (!locationDisplayHeight || !list || list.length === 0) {
      return null;
    }

    let counter = 0;
    let response = [];
    let column = [];
    while (counter < list.length) {
      column = list.slice(counter, counter + numberOfRows)
        .map((loc) => this.renderColumnWithRow(loc));

      counter += numberOfRows;

      response.push(
        <View key={counter} style={counter === 0 ? styles.container : {}}>
          {column}
        </View>
      );
    }

    return response;
  }
}

LocationListPanel.defaultProps = {
  styles
};

LocationListPanel.propTypes = {
  onSelectLocation: PropTypes.func.isRequired,
  selectedList: PropTypes.array.isRequired,
  locationDisplayHeight: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  styles: PropTypes.object.isRequired
};

export { LocationListPanel };