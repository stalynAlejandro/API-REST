import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { STRINGS } from "constants";
import { Animated, Alert, View, ScrollView, Keyboard, SafeAreaView, BackHandler, } from "react-native";
import {
  DefaultAlert,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  TitleSectionWithLeftAndOptionalRightButton,
  BackGreyArrowButton,
  DefaultServerErrorMessage,
  BackRoundButton,
  DefaultInputError
} from "components";
import {
  DualButtonChoice,
  DeleteAlertBox,
  SectionList,
  SectionListHeading,
  SectionDialog,
  ProductCarteInput,
  ProductVeganSelection,
  ProductHiddenSelection,
  DialogAlertBox
} from "./ProductCarteCRUDScreen.UI";
import { ComponentFactory } from "shared";
import styles from "./ProductCarteCRUDScreen.component.styles";
import {
  addProductCarteToCatalog,
  updateProductCarteFromCatalog,
  deleteProductCarteFromCatalog,
  navigateBack,
  navigateToEditProductCarte
} from "../../store/providerCatalogProducts/productsCarte";
import { addSectionRequested } from "../../store/providerCatalogProducts/sections";
import { AppState, ErrorDetail } from "store";
import { withAuthentication } from "../../HOC";

import { SIZE } from 'constants';
import AddIcon from '../../../assets/All_Icons/symbols/plus_main.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


const NewSectionPopUp = ComponentFactory("NewSectionPopUp", "DefaultAlert");

const GoBackWithoutSavingAlert = ComponentFactory(
  "GoBackWithoutSavingAlert",
  "DefaultAlert"
);

class ProductCarteCRUDScreenComponent extends React.Component<IProps, any> {
  goBackWithoutSavingAlertRef = React.createRef();
  newSectionAlertRef = React.createRef();
  confirmProductCarteAddedAlert = React.createRef();
  nameRef = React.createRef();
  descriptionRef = React.createRef();
  sectionsRef = React.createRef();
  allergensRef = React.createRef();
  pvpRef = React.createRef();
  displayOrderRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);

    const defaultProductCarte = {
      id: "",
      name: "",
      sectionIds: [],
      allergenIds: [],
      description: "",
      pvp: "",
      isVegan: false,
      displayOrder: '',
      isHiddenInCarte: false,
    }

    this.state = {
      productCarte: props.productCarteToEdit ? { ...props.productCarteToEdit } : defaultProductCarte,
      newSectionName: "",
      sectionDisplayHeight: 0,
      errorName: false,
      hasFocusedErrors: false,
      originalProductCarte: props.productCarteToEdit ? { ...props.productCarteToEdit } : defaultProductCarte,
      serverErrorValidations: {},
      isPVPModified: false,
      isSaving: false
    }
  };

  componentDidMount() {
    this.animatedError = new Animated.Value(0);
    if (this.backHandler) {
      this.backHandler.remove();
    }
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackHardware.bind(this));
  }
  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.error && nextProps.error !== null) {
      this.setState({
        isSaving: false
      });
    }
    if (nextProps.sections.length !== this.props.sections.length && this.state.productCarte.sectionIds.length === 0) {
      let newSection = nextProps.sections.filter(x => !this.props.sections.includes(x))[0];
      this.setState({
        productCarte: {
          ...this.state.productCarte,
          sectionIds: [newSection.id]
        }
      });
    }
  }
  saveOriginalEntity = () => {
    const { productCarteToEdit } = this.props;
    if (!productCarteToEdit) {
      this.setState({ originalProductCarte: this.state.productCarte });
      return;
    }

    this.setState({
      originalProductCarte: { ...productCarteToEdit },
      productCarte: { ...productCarteToEdit }
    });
  };

  didEntityChange = () => {
    const { productCarte, originalProductCarte } = this.state;

    return (
      JSON.stringify(productCarte) !== JSON.stringify(originalProductCarte)
    );
  };
  renderGoBackWithoutSavingAlert = () => {
    return (
      <GoBackWithoutSavingAlert
        ref={ref => { this.goBackWithoutSavingAlertRef = ref; }}
        options={(
          <DialogAlertBox
            onPressYes={() => {
              this.props.navigateBack();
              this.goBackWithoutSavingAlertRef.close();
            }
            }
            message={"¿Desea salir sin guardar los cambios?"}
            onPressNo={() => this.goBackWithoutSavingAlertRef.close()}
            yesText={"Si"}
            noText={"No"}
          />
        )}
      />
    );
  };

  onPressSelectSection = sectionId => {
    const { productCarte } = this.state;
    const { sectionIds } = productCarte;
    let newSectionIds = [];

    if (sectionIds.includes(sectionId)) {
      newSectionIds = sectionIds.filter(loc => loc !== sectionId);
    } else {
      newSectionIds = [sectionId];
    }

    this.setState({
      productCarte: {
        ...productCarte,
        sectionIds: newSectionIds
      }
    });
  };

  onPressAllergensSelection = allergenId => {
    const { productCarte } = this.state;
    const { allergenIds } = productCarte;
    let newallergenIds = [];

    if (allergenIds.includes(allergenId)) {
      newallergenIds = allergenIds.filter(loc => loc !== allergenId);
    } else {
      newallergenIds = [allergenId, ...allergenIds];
    }

    this.setState({
      productCarte: {
        ...productCarte,
        allergenIds: newallergenIds
      }
    });

  }

  endsWithDecimal(number) {
    return number.toString().endsWith(".") || number.toString().endsWith(",");
  }

  isValidNumber(number) {
    return number && !number.toString().endsWith(".") && !number.toString().endsWith(",") && !isNaN(number.toString().replace(",", "."));
  }
  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }
  renderAddSectionActionButtons = () => {
    const {
      styles,
    } = this.props;

    const { newSectionName } = this.state;


    let secondButton = {
      method: (() => {
        if (newSectionName !== "") {
          this.setState({ newSectionName: "" })
        }
        this.newSectionAlertRef.open();
      }),
      text: (
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AddIcon style={{}} {...SIZE.square_15} />
          <TypoGraphyOpenSans
            text={" Añadir Sección"}
            style={styles.btn_text_add_section}
          />
        </View>

      ),
      btnStyle: styles.main_btn
    };

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <DualButtonChoice
          secondButton={secondButton}
          isEdited={true}
        />
      </View>
    );
  };
  renderActionButtons = () => {
    const {
      styles,
      isNewProduct,
      navigateBack,
      addProductCarteToCatalog,
      updateProductCarteFromCatalog,

    } = this.props;
    const { productCarte, isPVPModified, isSaving } = this.state;
    const { pvp, name } = productCarte;
   
    const isSubmitable = this.didEntityChange() && !this.isEmptyOrSpaces(name) && pvp !== "" && pvp !== 0 && (!isNewProduct || isNewProduct && isPVPModified) && this.isValidNumber(pvp);

    let secondButton = {
      method: () => {
        Keyboard.dismiss();
        if (isSubmitable) {
          if (isSaving) {
            return;
          }
          this.setState({ isSaving: true });
          const submission = { ...productCarte };
          submission.pvp = submission.pvp.toString().replace(",", ".");
          addProductCarteToCatalog(submission);
        }
      },
      text: (
        <TypoGraphyOpenSansBold
          text={"Añadir Producto"}
          style={isSubmitable ? styles.btn_text : styles.btn_text_disabled}
        />
      ),
      btnStyle: { ...styles.secondary_btn, ...(isSubmitable ? styles.secondary_btn_enabled : {}) }
    };

    if (!isNewProduct) {
      secondButton = {
        method: () => {
          Keyboard.dismiss();
          if (isSubmitable) {
            if (isSaving) {
              return;
            }
            this.setState({ isSaving: true });
            const submission = { ...productCarte };
            submission.pvp = submission.pvp.toString().replace(",", ".");
            updateProductCarteFromCatalog(submission);
          }
        },
        text: (
          <TypoGraphyOpenSansBold
            text={STRINGS.saveProductCarte}
            style={isSubmitable ? styles.btn_text : styles.btn_text_disabled}
          />
        ),
        btnStyle: { ...styles.secondary_btn, ...(isSubmitable ? styles.secondary_btn_enabled : {}) }
      };
    }

    return (
      <DualButtonChoice
        secondButton={secondButton}
        isEdited={isSubmitable}
      />
    );
  };

  renderName = () => {
    const { productCarte } = this.state;
    return (
      <ProductCarteInput
        onChange={name =>
          this.setState({
            productCarte: {
              ...productCarte,
              name
            }
          })
        }
        onSubmitEditing={() => this.descriptionRef.current.focus()}
        autoFocus={this.props.isNewProduct}
        ref={this.nameRef}
        placeholder={"Introduce aquí el nombre"}
        numberOfLines={2}
        text={this.state.productCarte.name}
        label={"Nombre producto"}
        isRequired
      />
    );
  }

  renderDescription = () => {
    const { productCarte } = this.state;
    return (
      <ProductCarteInput
        onChange={description =>
          this.setState({
            productCarte: {
              ...productCarte,
              description
            }
          })
        }
        ref={this.descriptionRef}
        text={this.state.productCarte.description}
        placeholder={"Introduce aquí la descripción"}
        multiline={true}
        blurOnSubmit={true}
        label={"Descripción del producto"}
      />
    );
  }
  onChangePVP = (pvp) => {
    const { productCarte } = this.state;

    this.setState({
      isPVPModified: true,
      productCarte: {
        ...productCarte,
        pvp
      }
    })
  }
  renderPVP = () => {
    const { productCarte } = this.state;
    return (
      <ProductCarteInput
        onChange={pvp => this.onChangePVP(pvp)}
        ref={this.pvpRef}
        text={productCarte.pvp.toString()}
        numberOfLines={1}
        placeholder={"Establece el precio"}
        label={"Precio del producto"}
        keyboardType={"numeric"}
        returnKeyType={'done'}
        isRequired
      />
    );
  }
  onChangeProductCarteDisplayOrder = (newDisplayOrder) => {
    let value = Number(newDisplayOrder);
    if (isNaN(value)) {
      value = 0;
    }
    this.setState({ productCarte: { ...this.state.productCarte, "displayOrder": value } })
  }

  onVeganValueChange = () => {
    const { productCarte } = this.state;
    this.setState({
      productCarte: {
        ...productCarte,
        isVegan: !productCarte.isVegan
      }
    });
  }
  onHiddenValueChange = () => {
    const { productCarte } = this.state;
    this.setState({
      productCarte: {
        ...productCarte,
        isHiddenInCarte: !productCarte.isHiddenInCarte
      }
    });
  }

  onSubmitNewSectionName = () => {
    const { newSectionName } = this.state;
    this.props.addSectionRequested(newSectionName, this.props.sections.length > 0 ? Math.max.apply(Math, this.props.sections.map(function (o) { return o.displayOrder })) : 1, null);
    this.newSectionAlertRef.close();

    this.setState({ newSectionName: "" });
  };

  onCloseSection = () => {
    this.newSectionAlertRef.close();
    this.setState({ newSectionName: "" });
  }

  focusErrors = (serverErrorValidations) => {
    if (Object.keys(this.state.serverErrorValidations).length !== Object.keys(serverErrorValidations).length) {
      this.setState({ serverErrorValidations, hasFocusedErrors: false });
      return;
    }
    if (this.state.hasFocusedErrors) {
      return;
    }

    if (serverErrorValidations["name"]) {
      this.nameRef.current.focus();
      this.setState({ hasFocusedErrors: true });
      return;
    }

    if (serverErrorValidations["allergenids"]) {
      this.allergensRef.current.scrollTo(0);
      this.setState({ hasFocusedErrors: true });
      return;
    }

    if (serverErrorValidations["sectionids"]) {
      this.sectionsRef.current.scrollTo(0);
      this.setState({ hasFocusedErrors: true });
      return;
    }
    if (serverErrorValidations["pvp"]) {
      // this.pvpRef.current.focus();
      this.scrollViewRef.current.scrollToEnd();
      this.setState({ hasFocusedErrors: true });
      return;
    }
    if (serverErrorValidations["displayOrder"]) {
      // this.displayOrderRef.current.focus();
      this.scrollViewRef.current.scrollToEnd();
      this.setState({ hasFocusedErrors: true });
      return;
    }
  }

  renderNewSectionPopUp = () => {
    const { newSectionName } = this.state;

    return (
      <NewSectionPopUp
        ref={ref => {
          this.newSectionAlertRef = ref;
        }}
        options={
          <SectionDialog
            title={"NUEVA SECCIÓN"}
            value={newSectionName}
            placeholder={"Escribe aquí el nombre de la sección"}
            onChangeText={newSectionName => this.setState({ newSectionName })}
            onPressSubmit={this.onSubmitNewSectionName}
            btnText={"Añadir Sección"}
            disabled={typeof newSectionName !== "string" || newSectionName === ""}
            onCloseSection={this.onCloseSection}
          />
        }
      />
    );
  };
  handleBackHardware = () => {
    if (this.didEntityChange()) {
      this.goBackWithoutSavingAlertRef.open();
      return true;
    }
    else {
      return false;
    }
  }
  handleBack = () => {
    if (this.didEntityChange()) {
      this.goBackWithoutSavingAlertRef.open();
    }
    else {
      return this.props.navigateBack();
    }
  }

  renderWrapper = ()=> {
    if (this.didEntityChange()) {
      this.goBackWithoutSavingAlertRef.open();
    }
    else {
      return this.props.navigateBack();
    }
  }

  render() {
    const { styles, sections, isNewProduct, navigateBack, allergens, error } = this.props;
    const serverErrorValidations = error?.validationErrors ? error?.validationErrors : {}
    const { productCarte, sectionDisplayHeight } = this.state;
    const { sectionIds, allergenIds, isVegan, isHiddenInCarte } = productCarte;
    const showEmptySectionsMessage = sections.length === 0 && sectionIds.length === 0;
    this.focusErrors(serverErrorValidations);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"} style={styles.scroll} ref={this.scrollViewRef} >
            <TitleSectionWithLeftAndOptionalRightButton
              leftButton={<BackGreyArrowButton onPress={this.handleBack} />}
              headerText={isNewProduct ? "Nuevo Producto" : "Editar producto"}
            />
            {this.renderNewSectionPopUp()}
            {this.renderGoBackWithoutSavingAlert()}
            <View style={styles.body}>
              {this.renderName()}
              {<DefaultInputError style={styles.server_error_field} state={serverErrorValidations["name"]} errorMessage={serverErrorValidations["name"]} />}
              {this.renderDescription()}
              {<DefaultInputError style={styles.server_error_field} state={serverErrorValidations["description"]} errorMessage={serverErrorValidations["description"]} />}
            </View>
            <SectionListHeading headerText={"Sección de producto"} text={"Elige las secciones de este producto"} />
            {showEmptySectionsMessage && <TypoGraphyOpenSansBold style={styles.no_sections} text={"Todavía no has creado ninguna sección."} />}
            <View
              style={{ ...styles.scrollView_wrapper }}
              onLayout={event => {
                this.setState({ sectionDisplayHeight: 150 });
              }}
            >

              <SectionList
                sections={sections}
                sectionIds={sectionIds}
                sectionDisplayHeight={sectionDisplayHeight}
                onSelectSection={this.onPressSelectSection}
                ref={this.allergensRef}
              />
              <DefaultInputError style={styles.server_error_field} state={serverErrorValidations["sectionids"]} errorMessage={serverErrorValidations["sectionids"]} />
            </View>
            {this.renderAddSectionActionButtons()}
            <SectionListHeading headerText={"Alérgenos"} text={"Selecciona los alérgenos de este producto"} />
            <View
              style={{ ...styles.scrollView_wrapper }}
              onLayout={event => {
                this.setState({ sectionDisplayHeight: 150 });
              }}
            >
              <SectionList
                sections={allergens}
                sectionIds={allergenIds}
                sectionDisplayHeight={sectionDisplayHeight}
                onSelectSection={this.onPressAllergensSelection}
                ref={this.sectionsRef}
              />
              <DefaultInputError style={styles.server_error_field} state={serverErrorValidations["allergenids"]} errorMessage={serverErrorValidations["allergenids"]} />
            </View>
            <View style={styles.body}>
              <ProductVeganSelection value={isVegan} onValueChange={this.onVeganValueChange} />
              <ProductHiddenSelection value={isHiddenInCarte} onValueChange={this.onHiddenValueChange} />
              {this.renderPVP()}
              {<DefaultInputError style={styles.server_error_field} state={serverErrorValidations["pvp"]} errorMessage={serverErrorValidations["pvp"]} />}
              {this.endsWithDecimal(this.state.productCarte.pvp) && <DefaultInputError style={styles.server_error_field}
                state={true} errorMessage={"Formato de precio incorrecto. El número no debe acabar en el separador de decimales."} />}
            </View>

            {error && error.status !== "400" && <DefaultServerErrorMessage
              error={error}
              containerStyles={styles.error_container_styles}
            />}
            <View style={styles.container_space_for_last_error}></View>
            {isNewProduct && this.renderActionButtons()}
          </KeyboardAwareScrollView>
          {!isNewProduct && this.renderActionButtons()}
        </View >
      </SafeAreaView>
    );
  }
}

ProductCarteCRUDScreenComponent.defaultProps = {
  styles
};

interface IPropsFromState {
  error: ErrorDetail | null;
  sections: any;
  loading: boolean;
  productCarteDictionary: { [id: string]: any };
}

interface IProps extends IPropsFromState, IOwnProps {
  navigateToProviderSelect: Function;
  deleteProductCarteFromCatalog: Function;
  navigateToEditProductCarte: Function;
}

interface IOwnProps {
  locationDictionary: any;
  providerDictionary: any;
  onRef: any; //TODO what is this for
  styles: any;
  numberOfProductCarteDisplay: number;
  allergens: any;
}

ProductCarteCRUDScreenComponent.propTypes = {
  isNewProduct: PropTypes.bool,
  productCarteToEdit: PropTypes.object,
  error: PropTypes.any,
  sections: PropTypes.array,
  loading: PropTypes.bool,
  productCarteDictionary: PropTypes.object,
  addProductCarteToCatalog: PropTypes.func,
  updateProductCarteFromCatalog: PropTypes.func,
  deleteProductCarteFromCatalog: PropTypes.func,
  addSectionRequested: PropTypes.func,
  navigateBack: PropTypes.func,
  navigateToEditProductCarte: PropTypes.func,
  styles: PropTypes.object
};

const mapStateToProps = (state: AppState): IPropsFromState => {
  return {
    error: state.providerCatalogProducts.productsCarte.error,
    sections: state.providerCatalogProducts.sections.list,
    loading: state.providerCatalogProducts.productsCarte.loading,
    productCarteDictionary: state.providerCatalogProducts.productsCarte.dictionary,
    allergens: Object.values(state.providerCatalogProducts.allergens)
  };
};

const mapDispathToProps = {
  addProductCarteToCatalog,
  updateProductCarteFromCatalog,
  deleteProductCarteFromCatalog,
  addSectionRequested,
  navigateBack,
  navigateToEditProductCarte
};

const mergeProps = (
  propsFromState: IPropsFromState,
  propsFromDispatch,
  ownProps
) => {
  const { productCarteDictionary } = propsFromState;
  const isNewProduct = !ownProps.navigation.getParam("editProductCarteId");
  const productCarteId = ownProps.navigation.getParam("target");
  const productCarteToEdit =
    productCarteDictionary[productCarteId] || undefined;

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    productCarteToEdit,
    isNewProduct
  };
};

const ProductCarteCRUDScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispathToProps,
  mergeProps
)(ProductCarteCRUDScreenComponent)));
export { ProductCarteCRUDScreen };
