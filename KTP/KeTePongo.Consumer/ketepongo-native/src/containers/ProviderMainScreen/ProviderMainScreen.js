import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FilterBarAndActionButtonHeader,
  SelectionListScroll
} from 'components';
import {
  SelectProviderHeading,
  LoadingMessageDisplay
} from './ProviderMainScreen.UI';

import styles from './ProviderMainScreen.component.styles';
import { navigateToProviderCatalogProducts } from '../../store/consumption/products';
import { navigateToEditProvider } from '../../store/consumption/providers';
import { withAuthentication } from "../../HOC";

let ProviderMainScreen = ({ ...props }) => {
  const [providers, setProviders] = useState(props.providers);
  const [text, setText] = useState("");

  useEffect(() => {
    setProviders(props.providers
      .filter((loc) => loc.tradeName.includes(text)))
  }, [props.providers, text]);

  const {
    providerLoading,
    navigateToProviderCatalogProducts,
    navigateToEditProvider
  } = props;

  if (!providers) { return <LoadingMessageDisplay />; }

  if (!providers || providerLoading) { return <LoadingMessageDisplay />; }

  return (
    <View style={styles.container}>
      <FilterBarAndActionButtonHeader
        onChangeTextFilter={setText}
        filterBarPlaceholder={"Buscar Proveedor"}
        onPressButton={navigateToEditProvider}
        buttonText={"Añadir Proveedor"}
      />

      <SelectProviderHeading />

      <SelectionListScroll
        list={providers}
        onPressSelect={(provider) => navigateToProviderCatalogProducts(provider.id)}
        onPressEdit={(provider) => navigateToEditProvider(JSON.stringify(provider))}
      />

    </View>
  );

}

ProviderMainScreen.defaultProps = {
  styles
};

ProviderMainScreen.propTypes = {
  providers: PropTypes.array.isRequired,
  providerLoading: PropTypes.bool.isRequired,
  navigateToProviderCatalogProducts: PropTypes.func.isRequired,
  navigateToEditProvider: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    providers: state.consumption.providers.list,
    providerLoading: state.consumption.providers.loading,
  };
};

const mapDispatchToProps = {
  navigateToProviderCatalogProducts,
  navigateToEditProvider
};

ProviderMainScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(ProviderMainScreen)));

export { ProviderMainScreen };
