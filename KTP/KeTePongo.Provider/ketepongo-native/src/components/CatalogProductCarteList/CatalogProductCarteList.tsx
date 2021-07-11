import React from "react";
import { connect } from "react-redux";
import { View, SectionList } from "react-native";
import {
  LoadingMessageDisplay,
  SingleCatalogProductCarteWithEditAndDeleteButton,
  DeleteAlertBox,
  ProductCatalogeSectionHeader,
  AllergensDialog,
  ProductDescriptionDialog,
  NoContentBody,
  FilterNoResults,
  TransitionNoProductsCarte
} from "./CatalogProductCarteList.Ui";

import styles from "./CatalogProductCarteList.component.styles";
import {
  navigateToEditProductCarte,
  deleteProductCarteFromCatalog,
  navigateToCreateProductCarte,
} from "../../store/providerCatalogProducts/productsCarte";
import { ComponentFactory } from 'shared';
import { AppState } from "store";
import { SectionDTO, AllergenDTO, CatalogProductDTO } from "../../model/DTOs";
import { SectionWithProducts } from "../../store/filterCatalogCarte";
import { navigateToCreateNewSection } from "../../store/providerCatalogProducts/sections";
import { DefaultAlert, Spinner } from "components";
import carteScrollReducer, { IScrollReducerActionType, setScrollInitialState } from "./CatalogProductCarteInfiniteScrollReducer";
React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
const DeleteProductCartealAlert = ComponentFactory('DeleteProductCartealAlert', 'DefaultAlert')
const DisplayAllergensDialog = ComponentFactory('DisplayAllergensDialog', 'DefaultAlert')
const DisplayDescriptionDialog = ComponentFactory('DisplayDescriptionDialog', 'DefaultAlert')

let deleteProductCarteAlertRef = React.createRef();
let displayAllergensDialogRef = React.createRef();
let displayDescriptionDialogRef = React.createRef();

const CatalogProductCarteListComponent: React.FC<IProps> = (props) => {
  const navigateToEditCallback = React.useCallback((id) => props.navigateToEditProductCarte(id), [])
  const deleteProductCarteCallBack = React.useCallback((id) => renderDeleteProductCarteAlert(id), [])
  const openFullDescriptionCallback = React.useCallback((product) => renderProductFullDescription(product), [])
  const openAllergensCallBack = React.useCallback((product) => renderAllergenInformationForProduct(product), [])
  const onPressDeleteProductCallback = React.useCallback((id) => {
    props.deleteProductCarteFromCatalog(id);
    deleteProductCarteAlertRef.close()
  }, [deleteProductCarteAlertRef])

  const onPressCancelDeleteProductCallBack = React.useCallback(() => deleteProductCarteAlertRef.close(), [deleteProductCarteAlertRef])

  const [productCarteId, setProductCarteId] = React.useState("");
  const [productToDisplayFurtherInformation, setproductToDisplayFurtherInformation] = React.useState("");

  const [scrollState, dispatchScrollStateAction] = React.useReducer(carteScrollReducer, setScrollInitialState(props.sectionsToDisplay, false));

  const { data, page, isDataCompletelyLoaded, isPageInitialized } = scrollState;

  const handleEndReached = () => {
    if (isDataCompletelyLoaded) {
      return;
    }
    if (props.sectionsToDisplay.length - 1 <= page) {
      dispatchScrollStateAction({ type: IScrollReducerActionType.DATA_END_REACHED });
      return;
    }else{

    }

    dispatchScrollStateAction({ type: IScrollReducerActionType.MORE_DATA_LOADED, payload: props.sectionsToDisplay[page + 1] });
  }

  React.useEffect(() => {
    if(isPageInitialized){
      dispatchScrollStateAction({ type: IScrollReducerActionType.REFRESH_DATA, payload: props.sectionsToDisplay });
    }else{
      dispatchScrollStateAction({ type: IScrollReducerActionType.PAGE_INITIALIZED});
    }
  }, [props.sectionsToDisplay])

  const renderDeleteProductCarteAlert = (newProductCarteId: number | undefined) => {
    if (newProductCarteId && productCarteId !== newProductCarteId) {
      setProductCarteId(newProductCarteId);
    }

    if (newProductCarteId) {
      deleteProductCarteAlertRef.open();
    }

    return (
      <DeleteProductCartealAlert
        ref={ref => deleteProductCarteAlertRef = ref}
        options={(
          <DeleteAlertBox
            onPressYes={()=>onPressDeleteProductCallback(productCarteId)}
            onPressNo={onPressCancelDeleteProductCallBack}
            productName={props.catalogProducts.find(x => x.id === productCarteId)?.name}
          />
        )}
      />
    );
  };

  const renderNoContent = (section) => {
    if (section.id > 0 && section.data.length == 0) {
      return <NoContentBody />
    }
    return null;
  }


  const renderProductCarteList = () => {
    const {
      numberOfProductCarteDisplay,
      navigateToCreateProductCarte,
      navigateToCreateNewSection,
      anyProductInDB,
    } = props;

    if (!data) {
      return <LoadingMessageDisplay />;
    }

    if (numberOfProductCarteDisplay === 0 && !anyProductInDB) {
      return <TransitionNoProductsCarte navigateToCreateProductCarte={navigateToCreateProductCarte} navigateToCreateNewSection={navigateToCreateNewSection} />
    }
    if (numberOfProductCarteDisplay === 0) {
      return <FilterNoResults />
    }

    return (
      <View style={styles.flatListWithProducts} >
        <SectionList
          sections={data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          removeClippedSubviews={true}
          renderItem={({ item }) => (
            <SingleCatalogProductCarteWithEditAndDeleteButton
              index={1}
              item={item}
              navigateToEditProductCarte={navigateToEditCallback}
              deleteProductCarte={deleteProductCarteCallBack}
              openAllergensInformation={openAllergensCallBack}
              containerStyle={item.isHiddenInCarte ? styles.productCarte_container_hidden : styles.productCarte_container}
              hasToDisplayAllergensLabel={item.allergenIds.length > 0 && !item.isHiddenInCarte}
              openDescriptionInformation={openFullDescriptionCallback}
              isDragActive={false}
              isEditDisplayOrder={false}
            />
          )}
          maxToRenderPerBatch={50}
          updateCellsBatchingPeriod={50}
          viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
          renderSectionFooter={({ section }) => renderNoContent(section)}
          renderSectionHeader={({ section }) => ((section.section.id >= 0 || section.data.length > 0) && <ProductCatalogeSectionHeader text={section.section.name} isEditDisplayOrder={false} />)}
          ListFooterComponent={isDataCompletelyLoaded ? <View style={styles.add_margin_bottom}></View> : <Spinner />}
          onEndReached={handleEndReached}
        />
      </View>
    );
  };

  const closeAllergensDialogCallback = React.useCallback(() => displayAllergensDialogRef.close(), [displayAllergensDialogRef])

  const renderAllergenInformationForProduct = (product) => {
    if (product) {
      setproductToDisplayFurtherInformation(product);
      displayAllergensDialogRef.open();
    }

    return (
      <DisplayAllergensDialog
        ref={ref => displayAllergensDialogRef = ref}
        options={
          <AllergensDialog
            allergensIds={productToDisplayFurtherInformation.allergenIds}
            allergens={props.allergens}
            closeDialog={closeAllergensDialogCallback}
          />
        }
      />
    );
  }

  const closeDescriptionDialogCallBack = React.useCallback(() => displayDescriptionDialogRef.close(), [displayDescriptionDialogRef])

  const renderProductFullDescription = (product) => {
    if (product) {
      setproductToDisplayFurtherInformation(product);
      displayDescriptionDialogRef.open();
    }

    return (
      <DisplayDescriptionDialog
        ref={ref => displayDescriptionDialogRef = ref}
        options={productToDisplayFurtherInformation ? (
          <ProductDescriptionDialog productName={productToDisplayFurtherInformation.name}
            productDescription={productToDisplayFurtherInformation.description} closeDialog={closeDescriptionDialogCallBack} />
        ) : <View></View>}
      />
    );
  }


  return (
    <View style={styles.fillScreen}>
      {renderAllergenInformationForProduct(undefined)}
      {renderProductFullDescription(undefined)}
      {renderDeleteProductCarteAlert(undefined)}
      {renderProductCarteList()}
    </View>
  );
}

interface IPropsFromState {
  sectionsToDisplay: SectionWithProducts[];
  sections: SectionDTO[];
  allergens: { [id: number]: AllergenDTO }
  catalogProducts: CatalogProductDTO[];
}

interface IProps extends IPropsFromState, IOwnProps {
  navigateToProviderSelect: Function;
  deleteProductCarteFromCatalog: Function;
  navigateToEditProductCarte: Function;
  navigateToCreateProductCarte: Function;
  navigateToCreateNewSection: Function;
}

interface IOwnProps {
  numberOfProductCarteDisplay: number;
  anyProductInDB: boolean;
}

const mapStateToProps = (state: AppState, ownProps: IOwnProps): IPropsFromState => {
  return {
    sectionsToDisplay: state.filterCatalogCarte.sections || [],
    sections: state.providerCatalogProducts.sections.list || [],
    allergens: state.providerCatalogProducts.allergens,
    catalogProducts: state.providerCatalogProducts.productsCarte.list
  };
};

const mapDispathToProps = {
  navigateToEditProductCarte,
  deleteProductCarteFromCatalog,
  navigateToCreateProductCarte,
  navigateToCreateNewSection,
};

const mergeProps = (propsFromState: IPropsFromState, propsFromDispatch: any, ownProps: IOwnProps) => {
  const productsCarteToDisplay = (propsFromState.sectionsToDisplay && propsFromState.sectionsToDisplay.filter((sec) => (sec.data && sec.data.length > 0) || sec.id !== -1)) || [];
  const anyProductInDB = ((propsFromState.sections && propsFromState.sections.length > 0) || productsCarteToDisplay.length > 0 ||
    (propsFromState.catalogProducts && propsFromState.catalogProducts.length > 0));
  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    productsCarteToDisplay,
    numberOfProductCarteDisplay: productsCarteToDisplay.length || 0,
    anyProductInDB
  };
};

const CatalogProductCarteList = connect(
  mapStateToProps,
  mapDispathToProps,
  mergeProps
)(CatalogProductCarteListComponent);

export { CatalogProductCarteList };
