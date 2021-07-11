import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MainButton, FilterButton } from 'components';
import styles from './CatalogTopNavigator.component.styles';

import { navigateToProviderSelect } from '../../store/consumption/products';
import { navigateToFilterCatalog } from '../../store/filterCatalog';
class CatalogTopNavigator extends React.Component {
  render() {
    const {
      styles,
      navigateToProviderSelect,
      navigateToFilterCatalog
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.add_product_btn_wrapper}>
          <MainButton onPressButton={() => navigateToProviderSelect()} buttonText={"Añadir Producto"} />
        </View>
        <FilterButton onPressFilter={() => navigateToFilterCatalog()} />
      </View>
    );
  }
}

CatalogTopNavigator.defaultProps = {
  styles
};

CatalogTopNavigator.propTypes = {
  navigateToProviderSelect: PropTypes.func.isRequired,
  navigateToFilterCatalog: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

const mapDispathToProps = {
  navigateToProviderSelect,
  navigateToFilterCatalog
};

CatalogTopNavigator = connect(null, mapDispathToProps)(CatalogTopNavigator);
export { CatalogTopNavigator };
