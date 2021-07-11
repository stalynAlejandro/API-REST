import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { LogoWithBurguerWithTitleSectionHeader } from 'components';
import { TITLES } from 'constants';
import {
  LocationNameInput,
  DeleteAndAddButtons,
  AlertDeleteConfirm,
  AlertNameChangeNotSave
} from './LocationCRUDScreen.UI';

import styles from './LocationCRUDScreen.component.styles';
import { ComponentFactory } from 'shared'
import { navigateBack, addLocationRequested, deleteLocationRequested, updateLocationRequested } from '../../store/consumption/locations';
import { withAuthentication } from "../../HOC";

const LocationNotSavedAlert = ComponentFactory("LocationNotSavedAlert", "DefaultAlert");

class LocationCRUDScreen extends React.Component {
  locationNotSaveRef = React.createRef();
  locationDeleteRef = React.createRef();

  state = {
    headerText: '',
    location: {
      name: '',
      id: '',
      changeVersion: ''
    },
    originalLocationName: '',
  }

  componentDidMount() {
    const headerText = this.props.navigation.getParam('headerText');
    if (headerText === TITLES.editLocation) {
      const location = JSON.parse(this.props.navigation.getParam('location'));
      this.setState({
        headerText,
        location,
        originalLocationName: location.name
      });
      return;
    }

    this.setState({ headerText });
  }

  onPressConfirmDelete = () => {
    const { location } = this.state
    this.props.deleteLocationRequested(location.id)
    this.locationDeleteRef.close();
  }

  renderDeleteAlert = () => (
    <LocationNotSavedAlert
      ref={(ref) => { this.locationDeleteRef = ref; }}
      options={(
        <AlertDeleteConfirm
          onPressConfirmDelete={() => this.onPressConfirmDelete()}
          onPressCancelDelete={() => this.locationDeleteRef.close()}
        />
      )}
    />
  );

  onChangeLocationName = (newName) => {
    this.setState({ "location": { ...this.state.location, "name": newName } })
  }

  renderNotSaveAlert = () => (
    <LocationNotSavedAlert
      ref={(ref) => { this.locationNotSaveRef = ref; }}
      options={(
        <AlertNameChangeNotSave
          onPressConfirmDoNotSave={this.props.navigateBack}
          onPressCancel={() => this.locationNotSaveRef.close()}
        />
      )}
    />
  );

  onPressReturn = () => {
    const { location, originalLocationName } = this.state
    if (location.name && originalLocationName !== location.name) {
      this.locationNotSaveRef.open();
      return;
    }

    return this.props.navigateBack();
  };

  onPressDelete = () => {
    const { location } = this.state
    if (location.id)
      this.locationDeleteRef.open()
    else
      this.props.navigateBack()
  }

  onPressChangeName = async () => {
    const { location } = this.state
    if (!location.id)
      this.props.addLocationRequested(location.name)
    else
      this.props.updateLocationRequested(location)
  }

  render() {
    const { styles } = this.props;
    const { headerText, location, originalLocationName } = this.state;
    const { name } = location;

    return (
      <View style={styles.fillScreen}>
        <LogoWithBurguerWithTitleSectionHeader
          onPressBack={this.onPressReturn}
          headerText={headerText}
        />
        {this.renderDeleteAlert()}
        {this.renderNotSaveAlert()}
        <View style={styles.body}>
          <View style={styles.fillScreen}>
            <LocationNameInput
              onChangeText={this.onChangeLocationName}
              value={name}
            />
          </View>

          <View>
            <DeleteAndAddButtons
              onPressDeleteFromList={this.onPressDelete}
              onPressChangeName={this.onPressChangeName}
              disabled={!location.name || originalLocationName === location.name}
            />
          </View>
        </View>

      </View>
    );
  }
}

LocationCRUDScreen.defaultProps = {
  styles
};

LocationCRUDScreen.propTypes = {
  navigation: PropTypes.object,
  navigateBack: PropTypes.func.isRequired,
  addLocationRequested: PropTypes.func.isRequired,
  deleteLocationRequested: PropTypes.func.isRequired,
  updateLocationRequested: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  navigateBack,
  addLocationRequested,
  deleteLocationRequested,
  updateLocationRequested
};

LocationCRUDScreen = withAuthentication((connect(null, mapDispatchToProps)(LocationCRUDScreen)));

export { LocationCRUDScreen };
