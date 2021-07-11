import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { STRINGS } from 'constants';
import {
  Animated,
  Alert,
  View,
  ScrollView
} from 'react-native';
import {
  CoverPhoto,
  DefaultAlert,
  TypoGraphyOpenSansBold
} from 'components';
import {
  DualButtonChoice,
  DeleteAlertBox,
  LocationList,
  LocationListHeading,
  ProductDetailInput,
  ProductNameForEdit,
  ProductNameWithPlaceHolder,
  ProviderList,
  ProviderSelectionHeading,
  ProviderName,
  SingleProviderOption,
  SingleSelectedProviderOption,
} from './ProductCRUDScreen.UI';
import { ComponentFactory } from 'shared'
import styles from './ProductCRUDScreen.component.styles';
import {
  addProductToCatalog,
  updateProductFromCatalog,
  deleteProductFromCatalog,
  navigateBack,
  navigateToEditProduct,
} from '../../store/consumption/products';
import {
  addLocationRequested
} from '../../store/consumption/locations'
import { withAuthentication } from "../../HOC";

const NewLocationPopUp = ComponentFactory('NewLocationPopUp', 'DefaultAlert')
const ChangeNamePopUp = ComponentFactory('ChangeNamePopUp', 'DefaultAlert')
const ProviderListSelection = ComponentFactory('ProviderListSelection', 'DefaultAlert')
const DeleteProductalAlert = ComponentFactory('DeleteProductalAlert', 'DefaultAlert')

class ProductCRUDScreen extends React.Component {
  deleteProductAlertRef = React.createRef();
  newLocationAlertRef = React.createRef();
  nameChangeAlertRef = React.createRef();
  providerListRef = React.createRef();
  inputNameRef = React.createRef();
  confirmProductAddedAlert = React.createRef();

  state = {
    product: {
      id: '',
      name: '',
      imageUrl: '',
      locationsIds: [],
      providerId: this.props.providerId,
      isRejected: false
    },
    originalProduct: '',
    pictureData: undefined,
    newLocationName: '',
    locationDisplayHeight: 0,
    errorName: false,
  };

  componentDidMount() {
    this.animatedError = new Animated.Value(0);
    this.saveOriginalEntity();
  }

  saveOriginalEntity = () => {
    const { productToEdit } = this.props;
    if (!productToEdit) {
      this.setState({ originalProduct: this.state.product });
      return;
    }

    this.setState({ originalProduct: { ...productToEdit }, product: { ...productToEdit } });
  }

  didEntityChanged = () => {
    const { product, originalProduct } = this.state;

    return JSON.stringify(product) !== JSON.stringify(originalProduct);
  }

  returnProductCatalogScreen = () => {
    const haveProductChanged = this.didEntityChanged();

    if (haveProductChanged) {
      return Alert.alert(
        '¡Atención!',
        'Este producto no será guardado',
        [
          {
            text: 'Cancelar',
            onPress: () => { },
            style: 'cancel',
          },
          {
            text: 'Aceptar', onPress: this.props.navigateBack
          },
        ],
        { cancelable: false },
      );
    }

    return this.props.navigateBack();
  }

  onPressSelectLocation = (locationId) => {
    const { product } = this.state;
    const { locationsIds } = product;
    let newLocationsIds = [];

    if (locationsIds.includes(locationId)) {
      newLocationsIds = locationsIds.filter((loc) => loc !== locationId);
    } else {
      newLocationsIds = [locationId, ...locationsIds];
    }

    this.setState({
      product: {
        ...product,
        locationsIds: newLocationsIds
      }
    });
  }

  renderActionButtons = () => {
    const {
      styles,
      editProduct,
      navigateBack,
      addProductToCatalog,
      updateProductFromCatalog
    } = this.props;
    const { product } = this.state;

    let firstButton = {
      method: () => this.newLocationAlertRef.open(),
      text: <TypoGraphyOpenSansBold text={STRINGS.addNewLocation} style={styles.btn_text_main} />,
      btnStyle: styles.main_btn
    };

    let secondButton = {
      method: () => addProductToCatalog(product),
      text: <TypoGraphyOpenSansBold text={STRINGS.addToMyProduct} style={styles.btn_text} />,
      btnStyle: {}
    };

    if (editProduct) {
      firstButton = {
        method: () => this.deleteProductAlertRef.open(),
        text: <TypoGraphyOpenSansBold text={STRINGS.removeFromMyProducts} style={styles.btn_text_main} />,
        btnStyle: styles.delete_btn
      };
      secondButton = {
        method: () => updateProductFromCatalog(product),
        text: <TypoGraphyOpenSansBold text={STRINGS.saveProduct} style={styles.btn_text} />,
        btnStyle: styles.save_btn
      };
    }

    return <DualButtonChoice firstButton={firstButton} secondButton={secondButton} />;
  }

  onPressSelectProvider = (providerId) => {
    const { product } = this.state;
    this.setState({
      product: {
        ...product,
        providerId
      }
    });
    this.providerListRef.close();
  }

  renderProviderSelectionListPopUp = () => {
    const { editProduct, providerList } = this.props;
    const { product } = this.state;
    const { providerId } = product;

    if (!editProduct) {
      return null;
    }

    const displayProviderList = providerList.map((provider, index) => {
      if (provider.id === providerId) {
        return (
          <View key={index}>
            <SingleSelectedProviderOption
              provider={provider}
              onPress={(providerId) => this.onPressSelectProvider(providerId)}
            />
          </View>
        );
      } else {
        return (
          <View key={index}>
            <SingleProviderOption
              key={index}
              provider={provider}
              onPress={(providerId) => this.onPressSelectProvider(providerId)}
            />
          </View>
        );
      }
    });

    return (
      <ProviderListSelection
        ref={(ref) => { this.providerListRef = ref; }}
        options={(
          <ProviderList
            onPressClose={() => this.providerListRef.close()}
            displayProviderList={displayProviderList}
          />
        )}

      />
    );
  };

  renderProviderHeading = () => {
    const { providerDictionary, editProduct } = this.props;

    if (!editProduct) {
      return null;
    }

    const { providerId } = this.state.product;
    let selectedProvider;

    if (providerId) {
      selectedProvider = providerDictionary[providerId].tradeName || '';
    }

    return (
      <ProviderSelectionHeading
        onPressToggle={() => this.providerListRef.open()}
        selectedProvider={selectedProvider}
      />
    );
  };

  renderName = () => {
    const { providerName } = this.props;
    const { product } = this.state;
    const { name } = product;

    if (providerName && (!name || name === '')) {
      return <ProductNameWithPlaceHolder onPressEditName={() => this.nameChangeAlertRef.open()} />;
    }

    return (
      <ProductNameForEdit
      onPressEditName={() => this.nameChangeAlertRef.open()}
      name={name}
      />
    );
  }

  renderChangeNamePopUp = () => {
    const { product } = this.state;
    const { name } = product;

    return (
      <ChangeNamePopUp
        ref={(ref) => { this.nameChangeAlertRef = ref; }}
        options={(
          <ProductDetailInput
            title={"NUEVO NOMBRE"}
            value={name}
            placeholder={"Escribe aquí el nombre del producto"}
            onChangeText={(name) => this.setState({
              product: {
                ...product,
                name
              }
            })}
            onPressSubmit={() => this.nameChangeAlertRef.close()}
            btnText={"Cambiar Nombre"}
          />
        )}
      />
    );
  };

  onSubmitNewLocationName = () => {

    const { newLocationName } = this.state;
    this.props.addLocationRequested(newLocationName, "");
    this.newLocationAlertRef.close();
  };

  renderNewLocationPopUp = () => {
    const { newLocationName } = this.state;

    return (
      <NewLocationPopUp
        ref={(ref) => { this.newLocationAlertRef = ref; }}
        options={(
          <ProductDetailInput
            title={"NUEVO LUGAR"}
            value={newLocationName}
            placeholder={"Escribe aquí el nombre del lugar"}
            onChangeText={(newLocationName) => this.setState({ newLocationName })}
            onPressSubmit={this.onSubmitNewLocationName}
            btnText={"Añadir Lugar"}
          />
        )}
      />
    );
  }

  renderProviderName = () => {
    const { providerName } = this.props;
    if (!providerName) {
      return null;
    }

    return <ProviderName providerName={providerName} />;
  };

  renderDeleteProductAlert = () => (
    <DeleteProductalAlert
      ref={(ref) => { this.deleteProductAlertRef = ref; }}
      options={(
        <DeleteAlertBox
          onPressYes={() => this.props.deleteProductFromCatalog(this.state.product.id)}
          onPressNo={() => this.deleteProductAlertRef.close()}
        />
      )}
    />
  )

  render() {
    const {
      styles,
      locations,
      providerDictionary,
      editProduct
    } = this.props;
    const {
      product,
      locationDisplayHeight
    } = this.state;
    const {
      imageUrl,
      locationsIds,
      providerId
    } = product;

    const productPhotoInfo = {
      providerName: !providerId ?? (providerDictionary[providerId]).tradeName,
      ref: '48510'
    };

    return (
      <ScrollView style={styles.container}>
        <CoverPhoto
          imageUrl={imageUrl}
          providerInfo={editProduct ? productPhotoInfo : undefined}
          onPressBack={this.returnProductCatalogScreen}
          onPressUpload={this.onPressEditImage}
        />

        {this.renderDeleteProductAlert()}
        {this.renderProviderName()}
        {this.renderNewLocationPopUp()}
        {this.renderChangeNamePopUp()}
        {this.renderProviderSelectionListPopUp()}

        <View style={styles.body}>
          {this.renderName()}
          {this.renderProviderHeading()}

          <LocationListHeading />
        </View>

        <View
          style={styles.scrollView_wrapper}
          onLayout={(event) => this.setState({ locationDisplayHeight: event.nativeEvent.layout.height })}
        >
          <LocationList
            locations={locations}
            locationsIds={locationsIds}
            locationDisplayHeight={locationDisplayHeight}
            onSelectLocation={this.onPressSelectLocation}
          />
        </View>
        {this.renderActionButtons()}
      </ScrollView>
    );
  }
}

ProductCRUDScreen.defaultProps = {
  styles
};

ProductCRUDScreen.propTypes = {
  editProduct: PropTypes.bool,
  productToEdit: PropTypes.object,
  providerId: PropTypes.number,
  providerName: PropTypes.string,
  error: PropTypes.any,
  locations: PropTypes.array,
  loading: PropTypes.bool,
  productDictionary: PropTypes.object,
  providerDictionary: PropTypes.object.isRequired,
  providerList: PropTypes.array.isRequired,
  addProductToCatalog: PropTypes.func,
  updateProductFromCatalog: PropTypes.func,
  deleteProductFromCatalog: PropTypes.func,
  addLocationRequested:PropTypes.func,
  navigateBack: PropTypes.func,
  navigateToEditProduct: PropTypes.func,
  styles: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    error: state.consumption.products.error,
    locations: state.consumption.locations.list,
    loading: state.consumption.products.loading,
    productDictionary: state.consumption.products.dictionary,
    providerDictionary: state.consumption.providers.dictionary,
    providerList: state.consumption.providers.list,
  };
};

const mapDispathToProps = {
  addProductToCatalog,
  updateProductFromCatalog,
  deleteProductFromCatalog,
  addLocationRequested,
  navigateBack,
  navigateToEditProduct,
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const { productDictionary, providerDictionary } = propsFromState;
  const editProduct = ownProps.navigation.getParam('editProductId');
  const providerId = ownProps.navigation.getParam('providerId');
  const productId = ownProps.navigation.getParam('target');
  const productToEdit = productDictionary[productId] || undefined;
  const providerName = providerId ? providerDictionary[providerId].tradeName : undefined;

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    productToEdit,
    editProduct,
    providerName,
    providerId
  };
};

ProductCRUDScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispathToProps,
  mergeProps
)(ProductCRUDScreen)));
export { ProductCRUDScreen };
