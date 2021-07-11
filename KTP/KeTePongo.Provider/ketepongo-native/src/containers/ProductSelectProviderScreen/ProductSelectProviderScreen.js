import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SelectionListScroll, FilterBarAndTitleSectionHeader } from 'components';

import styles from './ProductSelectProviderScreen.component.styles';
import { LoadingMessageDisplay, SelectProviderHeading } from './ProductSelectProviderScreen.UI';
import {
  navigateBack,
  navigateToProviderCatalogProducts,
} from '../../store/consumption/products';
import { withAuthentication } from "../../HOC";

class ProductSelectProviderScreen extends React.Component {
  state = {
    providers: null,
    provider: ''
  }

  componentDidMount = () => this.setState({ providers: this.props.providers });

  filterProvider = (text) => {
    const providers = this.props.providers.map((pro) => {
      if (pro.tradeName.includes(text)) {
        return pro;
      }
    }).filter((pro) => pro !== undefined);

    this.setState({ providers });
  }

  render() {
    const {
      styles,
      providerLoading,
      navigateBack,
      navigateToProviderCatalogProducts
    } = this.props;
    const { providers } = this.state;

    if (!providers || providerLoading) {
      return <LoadingMessageDisplay />;
    }

    return (
      <View style={styles.fillScreen}>
        <FilterBarAndTitleSectionHeader
          onSearch={(text) => this.filterProvider(text)}
          filterPlaceholder={"Buscar Proveedor"}
          onPressNavigateBack={() => navigateBack()}
          headerText={"Nuevo Producto"}
        />

        <SelectProviderHeading />

        <SelectionListScroll
          list={providers}
          onPressSelect={(provider) => navigateToProviderCatalogProducts(provider.id)}
        />
      </View>
    );
  }
}

ProductSelectProviderScreen.defaultProps = {
  styles
};

ProductSelectProviderScreen.propTypes = {
  providers: PropTypes.array.isRequired,
  providerLoading: PropTypes.bool.isRequired,
  navigateToProviderCatalogProducts: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    providers: state.consumption.providers.list,
    providerLoading: state.consumption.providers.loading,
  };
};

const mapDispatchToProps = {
  navigateBack,
  navigateToProviderCatalogProducts
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps
  };
};

ProductSelectProviderScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProductSelectProviderScreen)));

export { ProductSelectProviderScreen };
