import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ProviderCatalogList,
  FilterBarAndTitleSectionHeader
} from 'components';

import styles from './ProviderProductCatalogScreen.component.styles';
import {
  TransitionProviderNotLinked,
  TransitionNoProduct,
  LoadingMessageDisplay,
  ProviderCatalogHeading
} from './ProviderProductCatalogScreen.UI';
import {
  navigateBack,
  navigateToAddProductToCatalog,
  navigateToCreateProduct,
  reloadAllData
} from '../../store/consumption/products';
import { withAuthentication } from "../../HOC";

let ProviderProductCatalogScreen = ({ ...props }) => {
  const {
    navigateToCreateProduct,
    providerId,
    navigateToAddProductToCatalog,
    styles,
    productLoading,
    navigateBack,
    providerName,
  } = props;

  const { list } = useSelector(state => ({
    ...state.consumption.products
  }))
  const propProducts = useMemo(() => list.filter((prod) => prod.providerId == providerId), [list])

  const [products, setProducts] = useState(propProducts)
  const [text, setText] = useState('')

  useEffect(() => {
    if (propProducts)
      setProducts(propProducts.filter((prod) => prod.name.includes(text)))
  }, [text, propProducts])

  const renderView = () => {

    if (propProducts.length === 0) {
      return (
        <TransitionProviderNotLinked
          onPressInviteProvider={() => console.log('invite provider pressed')}
          onPressCreateNewProduct={() => navigateToCreateProduct(providerId)}
        />
      );
    }
    /* ToDo cuando se enlacen los proveedores*/
    if (products && products.length === 0) {
      return (
        <TransitionNoProduct
          onPressChangeProvider={() => console.log('pressed change provider')}
          onPressCreateProduct={() => navigateToCreateProduct(providerId)}
        />
      );
    }/**/

    return (
      <View style={styles.body} >
        <View style={styles.fillScreen}>
          <ProviderCatalogList
            list={products}
            onPressAddProduct={(productId) => navigateToAddProductToCatalog(productId)}
          />
        </View>
      </View>
    );
  }

  if (!list || productLoading) {
    return <LoadingMessageDisplay />;
  }

  return (
    <View>
      <FilterBarAndTitleSectionHeader
        onSearch={setText}
        filterPlaceholder={"Buscar Producto"}
        onPressNavigateBack={() => navigateBack()}
        headerText={"Nuevo Producto"}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.body}>
            <TransitionProviderNotLinked
              onPressInviteProvider={() => console.log('invite provider pressed')}
              onPressCreateNewProduct={() => navigateToCreateProduct(providerId)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

ProviderProductCatalogScreen.defaultProps = {
  styles
};

ProviderProductCatalogScreen.propTypes = {
  providerId: PropTypes.number.isRequired,
  providerName: PropTypes.string.isRequired,
  productLoading: PropTypes.bool.isRequired,
  providerDictionary: PropTypes.object,
  navigateBack: PropTypes.func.isRequired,
  navigateToAddProductToCatalog: PropTypes.func.isRequired,
  navigateToCreateProduct: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    productLoading: state.consumption.products.loading,
    providerDictionary: state.consumption.providers.dictionary
  };
};

const mapDispatchToProps = {
  navigateBack,
  navigateToAddProductToCatalog,
  navigateToCreateProduct,
  reloadAllData
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const { providerDictionary } = propsFromState;
  const providerId = ownProps.navigation.getParam('providerId');
  const providerName = providerDictionary[Number(providerId)] ? providerDictionary[Number(providerId)].tradeName : '';

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    providerId: Number(providerId),
    providerName
  };
};

ProviderProductCatalogScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProviderProductCatalogScreen)));

export { ProviderProductCatalogScreen };
