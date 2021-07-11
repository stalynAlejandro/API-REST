import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { COLORS } from 'constants';
import {
  CatalogProductList,
  DefaultAlert,
  Spinner,
} from 'components';
import {
  CatalogHeader,
  CatalogHeaderWithFilter,
  ConfirmProductHasBeenAdded,
  DisplayErrorMessage,
  DisplayCart
} from './ProductCatalogScreen.UI';

import styles from './ProductCatalogScreen.component.style';
import { AppState } from "store";
import { filterCatalogRequest } from '../../store/filterCatalog';
import { reloadAllDataRequested } from '../../store/consumption';
import { navigateToCurrentOrder } from '../../store/order';
import { hideSplashScreen } from '../../store/authentication';
import { loadConsumerOrders } from "../../store/order";
import { withAuthentication } from "../../HOC";

const ConfirmProductHasBeenAddedAlert = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
ConfirmProductHasBeenAddedAlert.displayName = 'ConfirmProductHasBeenAddedAlert';

class ProductCatalogScreen extends React.Component {
  confirmProductAddedAlert = React.createRef();

  // @TODO - to be remove when auth entry
  // & review reloadAllDataRequested method in actions
  componentDidMount = () => {
    this.props.reloadAllDataRequested();
    //this.props.loadConsumerOrders();
    // @TODO = To be remove when accessing from auth
   // this.props.hideSplashScreen();
  };

  renderServerError = () => {
    try {
      const { error } = this.props;
      if (!error) {
        return null;
      }
      const mainBtn = {
        functionCall: () => {
          this.forceUpdate();
          this.props.reloadAllDataRequested();
        },
        text: 'Intentar de nuevo'
      };
      return <DisplayErrorMessage error={error} mainBtn={mainBtn} />;
    }
    catch{
      return null;
    }
  }

  renderCart = () => {
    const { numberOfSku, navigateToCurrentOrder } = this.props;

    if (!numberOfSku) {
      return null;
    }

    return <DisplayCart numberOfSku={numberOfSku} onPress={() => navigateToCurrentOrder()} />;
  }

  renderProductCatalog = () => {
    const {
      loading,
      error,
      filterCatalogLoading,
      locationDictionary,
      providerDictionary,
      styles,
      orderLines
    } = this.props;

    if (error) {
      return null;
    }

    if (loading || filterCatalogLoading) {
      return <Spinner />;
    }

    return (
      <View style={styles.fillScreen}>
        <CatalogProductList
          orderLines={orderLines}
          locationDictionary={locationDictionary}
          providerDictionary={providerDictionary}
          onRef={(ref) => (this.child = ref)}
        />
      </View>
    );
  };

  renderHeader = () => {
    const {
      filterCatalogRequest,
      displayFilterConstrains,
      filterCatalogOptions,
      locationDictionary,
      providerDictionary
    } = this.props;

    if (!displayFilterConstrains) {
      return <CatalogHeader filterCatalogRequest={(text) => filterCatalogRequest(
        text,
         -1,
         -1,
         [-1]
      )} />;
    }

    return (
      <CatalogHeaderWithFilter
        filterCatalogRequest={(text) => filterCatalogRequest(
          text,
          -1,
          -1,
          [-1]
        )}
        displayFilterConstrains={displayFilterConstrains}
        filterCatalogOptions={filterCatalogOptions}
        locationDictionary={locationDictionary}
        providerDictionary={providerDictionary}
      />
    );
  };

  renderConfirmProductHasBeenAddedToYourList = () => {
    const { productAdded, providerDictionary } = this.props;
    let options = < View />;

    if (productAdded) {
      options = (
        <ConfirmProductHasBeenAdded
          onPressOk={() => this.confirmProductAddedAlert.close()}
          productName={productAdded.name}
          productProvider={providerDictionary[productAdded.providerId].tradeName}
        />
      );
      setTimeout(() => this.confirmProductAddedAlert.open(), 500);
    }

    return (
      <ConfirmProductHasBeenAddedAlert
        ref={(ref) => { this.confirmProductAddedAlert = ref; }}
        options={options}
      />
    );
  }

  render() {
    const { styles } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.neutral_min} barStyle="dark-content" />
        {this.renderConfirmProductHasBeenAddedToYourList()}
        {this.renderHeader()}

        <View style={styles.body}>
          {this.renderServerError()}
          {this.renderProductCatalog()}
          {this.renderCart()}
        </View>
      </View>
    );
  }
}

ProductCatalogScreen.defaultProps = {
  styles
};

ProductCatalogScreen.propTypes = {
  productAdded: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  numberOfSku: PropTypes.number.isRequired,
  orderLines: PropTypes.object.isRequired,
  filterCatalogLoading: PropTypes.bool,
  filterCatalogOptions: PropTypes.object,
  locationDictionary: PropTypes.object,
  providerDictionary: PropTypes.object,
  displayFilterConstrains: PropTypes.bool,
  filterCatalogRequest: PropTypes.func.isRequired,
  reloadAllDataRequested: PropTypes.func.isRequired,
  navigateToCurrentOrder: PropTypes.func.isRequired,
  hideSplashScreen: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

const mapStateToProps = (state: AppState) => {
  return {
    error: state.consumption.error,
    loading: state.consumption.loading,
    filterCatalogLoading: state.filterCatalog.loading,
    filterCatalogOptions: state.filterCatalog.search,
    locationDictionary: state.consumption.locations.dictionary || {},
    providerDictionary: state.consumption.providers.dictionary || {},
    orderLines: state.order.currentOrder.orderLines
  };
};

const mapDispatchToProps = {
  filterCatalogRequest,
  reloadAllDataRequested,
  navigateToCurrentOrder,
  hideSplashScreen,
  loadConsumerOrders
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const {
    filterCatalogOptions,
    productsToDisplay,
    filterCatalogLoading,
    loading
  } = propsFromState;
  const { weekdays, providerId, locationId } = filterCatalogOptions;
  let displayFilterConstrains = false;

  if (weekdays[0] !== -1 || providerId !== -1 || locationId !== -1) {
    displayFilterConstrains = true;
  }

  const numberOfSku = Object.values(propsFromState.orderLines).length;

  let productAdded = ownProps.navigation.getParam('added_product', undefined);
  if (productAdded) {
    productAdded = JSON.parse(productAdded);
  }

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    displayFilterConstrains,
    loading: (loading || filterCatalogLoading && !productsToDisplay),
    numberOfSku,
    productAdded
  };
};

ProductCatalogScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProductCatalogScreen)));

export { ProductCatalogScreen };
