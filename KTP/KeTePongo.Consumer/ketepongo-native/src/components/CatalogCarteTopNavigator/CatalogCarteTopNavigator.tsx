import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MainButton, FilterButton } from 'components';
import styles from './CatalogCarteTopNavigator.component.styles';

import { navigateToCreateProductCarte } from '../../store/providerCatalogProducts/productsCarte';
import { navigateToFilterCatalogCarte } from '../../store/filterCatalogCarte';
class CatalogCarteTopNavigator extends React.Component {
  render() {
    const {
      styles,
      navigateToCreateProductCarte,
      navigateToFilterCatalogCarte
    } = this.props;

    return (
      <View style={styles.container}>
        <FilterButton onPressFilter={() => navigateToFilterCatalogCarte()} />
      </View>
    );
  }
}

CatalogCarteTopNavigator.defaultProps = {
  styles
};

CatalogCarteTopNavigator.propTypes = {
  navigateToCreateProductCarte: PropTypes.func.isRequired,
  navigateToFilterCatalogCarte: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

const mapDispathToProps = {
  navigateToCreateProductCarte,
  navigateToFilterCatalogCarte
};

CatalogCarteTopNavigator = connect(null, mapDispathToProps)(CatalogCarteTopNavigator);
export { CatalogCarteTopNavigator };
