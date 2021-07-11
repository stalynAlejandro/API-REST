import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FilterBarAndActionButtonHeader, SelectionListScroll } from 'components';
import { SelectLocationHeading, LoadingMessageDisplay } from './LocationMainScreen.UI';

import styles from './LocationMainScreen.component.styles';

import {
  navigateToCreateNewLocation,
  navigateToEditLocation
} from '../../store/consumption/locations';
import { withAuthentication } from "../../HOC";

let LocationMainScreen = ({ ...props }) => {

  const [locations, setLocations] = useState(props.locations);
  const [text, setText] = useState("");

  useEffect(() => {
    setLocations(props.locations
      .filter((loc) => loc.name.includes(text))
    )
  }, [props.locations, text]);

  const {
    styles,
    navigateToCreateNewLocation,
    navigateToEditLocation
  } = props;

  if (!locations) {
    return <LoadingMessageDisplay />;
  }

  return (
    <View style={styles.container}>
      <FilterBarAndActionButtonHeader
        onChangeTextFilter={setText}
        filterBarPlaceholder={"Buscar Lugar"}
        onPressButton={() => navigateToCreateNewLocation()}
        buttonText={"Añadir Lugar"}
      />

      <SelectLocationHeading />

      <SelectionListScroll
        list={locations}
        onPressEdit={(location) => navigateToEditLocation(location)}
      />
    </View>
  );
}


LocationMainScreen.defaultProps = {
  styles
};

LocationMainScreen.propTypes = {
  locations: PropTypes.array.isRequired,
  navigateToCreateNewLocation: PropTypes.func.isRequired,
  navigateToEditLocation: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    locations: state.consumption.locations.list
  };
};

const mapDispatchToProps = {
  navigateToCreateNewLocation,
  navigateToEditLocation
};

LocationMainScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(LocationMainScreen)));

export { LocationMainScreen };
