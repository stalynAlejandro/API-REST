import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StatusBar, SafeAreaView, BackHandler, Alert } from 'react-native';
import {
  CatalogProductCarteList,
  DefaultAlert,
  Spinner,
  DefaultAcceptCancelDialog
} from 'components';
import {
  CatalogCarteHeaderWithFilter,
  DisplayCart,
  ServerErrorAlertDialog,
} from './ProductCarteCatalogScreen.UI';

import styles from './ProductCarteCatalogScreen.component.style';
import { AppState } from "store";
import { filterCatalogCarteRequestByKeyword, ISearchCatalog } from '../../store/filterCatalogCarte';
import { reloadAllDataRequested, removeError } from '../../store/providerCatalogProducts';
import { sendProductDisplayOrderUpdate, cancelSendProductDisplayOrderUpdate } from '../../store/providerCatalogProducts/productsCarte';
import { hideSplashScreen, signOutAsync } from '../../store/authentication';
import { loadConsumerOrders } from "../../store/order";
import { ProviderCatalogProductsDTO } from "../../model/DTOs";
import { ISectionHash } from '../../store/providerCatalogProducts/sections';
import { withAuthentication } from "../../HOC";
import { COLORS } from "constants";

const ServerErrorAlert = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
ServerErrorAlert.displayName = 'ServerErrorAlert';

class ProductCarteCatalogScreen extends React.Component<IProps> {
  serverErrorAlertRef = React.createRef();
  state = {
    hasToDisplayClosingSessionAlert: false
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAction.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction.bind(this));
  }

  backAction = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    this.setState({ hasToDisplayClosingSessionAlert: true })
    return true;
  }

  renderServerError = () => {
    const { error, removeError } = this.props;
    if (!error || !error.message || error.message === "") {
      return null;
    }

    return (
      <ServerErrorAlert
        ref={ref => { this.serverErrorAlertRef = ref; }}
        isVisible={true}
        options={
          <ServerErrorAlertDialog onPress={removeError} message={error.message} />
        }
      />
    );
  }

  renderProductCarteCatalog = () => {
    const {
      error,
      sectionDictionary,
      styles,
      isLoading
    } = this.props;

    if (error) {
      return null;
    }

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <View style={styles.fillScreen}>
        <CatalogProductCarteList
          sections={sectionDictionary}
          onRef={(ref) => (this.child = ref)}
        />
      </View>
    );
  };

  renderHeader = () => {
    const {
      filterCatalogCarteRequestByKeyword,
      hasTodisplayFilterConstrains,
      filterCatalogOptions,
      sectionDictionary,
      allergensDictionary,
      kindsOfFoodDictionary,
      keyword,
    } = this.props;

    const isAuthorizedToImpersonate = this.props.navigation.getParam('isAuthorizedToImpersonate', false);
    return (
      <CatalogCarteHeaderWithFilter
        filterCatalogCarteRequestByKeyword={(text) => filterCatalogCarteRequestByKeyword(
          text
        )}
        displayFilterConstrains={hasTodisplayFilterConstrains}
        filterCatalogCarteOptions={filterCatalogOptions}
        sectionDictionary={sectionDictionary}
        kindsOfFoodDictionary={kindsOfFoodDictionary}
        allergensDictionary={allergensDictionary}
        value={keyword}
        hasToDisplayImpersonateButton={isAuthorizedToImpersonate}
      />
    );
  }

  onPressOk = () => {
    this.setState({ hasToDisplayClosingSessionAlert: false })
    BackHandler.exitApp();
  }

  onPressCancel = () => this.setState({ hasToDisplayClosingSessionAlert: false });

  render() {
    const { styles } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar backgroundColor={COLORS.neutral_min} barStyle="dark-content" />
          {this.renderHeader()}
          {this.state.hasToDisplayClosingSessionAlert && <DefaultAcceptCancelDialog onPressOk={this.onPressOk}
            onPressCancel={this.onPressCancel.bind(this)} onPressOut={this.onPressCancel.bind(this)}
            text={"¿Desea salir de la aplicación?"} />}
          <View style={styles.body}>
            {this.renderServerError()}
            {this.renderProductCarteCatalog()}
          </View>
        </View >
      </SafeAreaView>
    );
  }
}


ProductCarteCatalogScreen.defaultProps = {
  styles
};

ProductCarteCatalogScreen.propTypes = {
  productCarteAdded: PropTypes.object,
  error: PropTypes.object,
  isloadingData: PropTypes.bool,
  filterCatalogLoading: PropTypes.bool,
  filterCatalogCarteOptions: PropTypes.object,
  sectionDictionary: PropTypes.object,
  hasTodisplayFilterConstrains: PropTypes.bool,
  filterCatalogCarteRequestByKeyword: PropTypes.func.isRequired,
  reloadAllDataRequested: PropTypes.func.isRequired,
  hideSplashScreen: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  sendProductDisplayOrderUpdate: PropTypes.func.isRequired,
  cancelSendProductDisplayOrderUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state: AppState): IPropsFromState => {
  return {
    error: state.providerCatalogProducts.error,
    isloadingData: state.providerCatalogProducts.loading,
    isFilterCatalogLoading: state.filterCatalogCarte.loading,
    filterCatalogCarteRequestByKeyword: state.filterCatalogCarte.search,
    sectionDictionary: state.providerCatalogProducts.sections.dictionary || {},
    productsToDisplay: state.filterCatalogCarte.sections,
    filterCatalogOptions: state.filterCatalogCarte.search,
    allergensDictionary: state.providerCatalogProducts.allergens,
    kindsOfFoodDictionary: state.providerCatalogProducts.kindsOfFood,
    isFilterInitialized: state.filterCatalogCarte.isInitialized,
    keyword: state.filterCatalogCarte.search.keyword,
  };
};

const mapDispatchToProps = {
  filterCatalogCarteRequestByKeyword,
  reloadAllDataRequested,
  hideSplashScreen,
  loadConsumerOrders,
  removeError,
  signOutAsync,
  sendProductDisplayOrderUpdate,
  cancelSendProductDisplayOrderUpdate
};

interface IPropsFromState {
  error: any;
  isloadingData: boolean;
  isFilterCatalogLoading: boolean;
  filterCatalogCarteRequestByKeyword: any;
  productsToDisplay: any
  providerCatalogProducts?: ProviderCatalogProductsDTO;
  sectionDictionary: ISectionHash;
  filterCatalogOptions: ISearchCatalog
  allergensDictionary: any;
  kindsOfFoodDictionary: any;
  isFilterInitialized: Boolean;
}

interface IProps extends IPropsFromState {
  filterCatalogRequest: Function;
  reloadAllDataRequested: Function;
  hideSplashScreen: Function;
  loadConsumerOrders: Function;
  initializeProviderCatalogProducts: () => void;
  hasTodisplayFilterConstrains: boolean;
  searchText: string;
  isLoading: boolean;
  removeError: Function;
  keyword: string;
  signOutAsync: Function;
  sendProductDisplayOrderUpdate: Function;
  cancelSendProductDisplayOrderUpdate: Function;
}

const mergeProps = (propsFromState: IPropsFromState, propsFromDispatch: any, ownProps: any) => {
  const {
    isFilterCatalogLoading,
    isloadingData,
    providerCatalogProducts,
    filterCatalogOptions,
    isFilterInitialized,
  } = propsFromState;

  let hasTodisplayFilterConstrains = filterCatalogOptions.keyword !== "" || filterCatalogOptions.selectedAllergens.length > 0 ||
    filterCatalogOptions.selectedSections.length > 0 || filterCatalogOptions.selectedKindsOfFood.length > 0;

  let productCarteAdded = ownProps.navigation.getParam('added_productCarte', undefined);
  if (productCarteAdded) {
    productCarteAdded = JSON.parse(productCarteAdded);
  }

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    hasTodisplayFilterConstrains,
    isLoading: (isloadingData || isFilterCatalogLoading || !isFilterInitialized),
    productCarteAdded
  };
};

ProductCarteCatalogScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProductCarteCatalogScreen)));

export { ProductCarteCatalogScreen };
