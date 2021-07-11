import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ARRAYS, STRINGS } from 'constants';
import { TouchableIcon, TypoGraphyOpenSans } from 'components';

import styles from './CatalogFilterConstrains.component.styles';
import CloseIcon from '../../../assets/All_Icons/symbols/x_grey.svg';
import FilterIcon from '../../../assets/All_Icons/basic/filter.svg';
import { filterCatalogRequest, navigateToFilterCatalog } from '../../store/filterCatalog';

class CatalogFilterConstrains extends React.Component {
  displayFilterConstrains = () => {
    const constrains = this.combineConstrains();
    return constrains.map((item) => this.createNameConstrain(item));
  }

  combineConstrains = () => {
    const {
      filterCatalogOptions,
      locationDictionary,
      providerDictionary
    } = this.props;
    const { weekdays, locationId, providerId } = filterCatalogOptions;
    let constrains = [];

    if (locationDictionary[locationId]) {
      constrains.push({ name: locationDictionary[locationId].name, type: STRINGS.location });
    }

    if (providerDictionary[providerId]) {
      constrains.push({ name:  providerDictionary[providerId].tradeName, type: STRINGS.provider });
    }

    if (ARRAYS.weekdays[weekdays[0]]) {
      constrains.push({ name: ARRAYS.weekdays[weekdays[0]].name, type: STRINGS.weekday });
    }

    return constrains;
  }

  createNameConstrain = ({ name, type }) => (
    <View key={name} style={styles.constrain}>
      <TouchableIcon
        onPress={() => this.onRemoveConstrain(type)}
        styles={{}}
        icon={<CloseIcon {...styles.icon_size} />}
      />
      <TypoGraphyOpenSans style={styles.name} text={name.toUpperCase()} />
    </View>
  );

  onRemoveConstrain = (type) => {
    const { filterCatalogOptions, filterCatalogRequest } = this.props;
    const {
      weekdays,
      locationId,
      providerId
    } = filterCatalogOptions;
    const locationConstrain = type === STRINGS.location ? -1 : locationId;
    const providerConstrain = type === STRINGS.provider ? -1 : providerId;
    const weekdayConstrain = type === STRINGS.weekday ? [-1] : weekdays;

    return filterCatalogRequest({
      keyword: '',
      locationId: locationConstrain,
      providerId: providerConstrain,
      weekdays: weekdayConstrain
    });
  }

  render() {
    const {
      styles,
      navigateToFilterCatalog,
      displayFilterConstrains
    } = this.props;

    if (!displayFilterConstrains) {
      return;
    }

    return (
      <View style={styles.container}>
        <View style={styles.constrain_wrapper}>
          {this.displayFilterConstrains()}
        </View>
        <TouchableIcon
          onPress={() => navigateToFilterCatalog()}
          styles={{}}
          icon={<FilterIcon {...styles.icon_size} />}
        />
      </View>
    );
  }
}

CatalogFilterConstrains.defaultProps = {
  styles
};

CatalogFilterConstrains.propTypes = {
  displayFilterConstrains: PropTypes.bool.isRequired,
  filterCatalogOptions: PropTypes.object.isRequired,
  locationDictionary: PropTypes.object.isRequired,
  providerDictionary: PropTypes.object.isRequired,
  filterCatalogRequest: PropTypes.func.isRequired,
  navigateToFilterCatalog: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  filterCatalogLoading: PropTypes.bool,
  styles: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  navigateToFilterCatalog,
  filterCatalogRequest
};

CatalogFilterConstrains = connect(null, mapDispatchToProps)(CatalogFilterConstrains);

export { CatalogFilterConstrains };
