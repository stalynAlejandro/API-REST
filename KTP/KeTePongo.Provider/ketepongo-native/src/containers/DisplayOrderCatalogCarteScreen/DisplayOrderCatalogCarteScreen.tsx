import React from "react";
import { connect } from "react-redux";
import { View, Animated, TouchableOpacity, BackHandler, SafeAreaView } from "react-native";
import {
  LoadingMessageDisplay,
  DraggableProduct,
  ProductCatalogeSectionHeader,
  TransitionNoProductsCarte,
} from "../../components/CatalogProductCarteList/CatalogProductCarteList.Ui";

import { ServerErrorAlertDialog, ErrorUpdatingDisplayOrderAlerBox } from "../../containers/ProductCarteCatalogScreen/ProductCarteCatalogScreen.UI";
import styles from "./DisplayOrderCatalogCarteScreen.component.styles";

import { AppState } from "../../store";
import { SectionDTO, CatalogProductDTO } from "../../model/DTOs";
import { SectionWithProducts, updateProductPairDisplayOrderCarteFromCatalog } from "../../store/filterCatalogCarte";
import { TypoGraphyOpenSans, DefaultAlert } from "components";
import { sendProductDisplayOrderUpdate, cancelSendProductDisplayOrderUpdate } from '../../store/providerCatalogProducts/productsCarte';
import DraggableFlatList from "react-native-draggable-flatlist";
import { removeError } from '../../store/providerCatalogProducts';
import { createSelector } from 'reselect'

const ServerErrorAlert = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
ServerErrorAlert.displayName = 'ServerErrorAlert';

const renderProduct = (item, index, drag, isDragActive) => {
  return (
    <TouchableOpacity activeOpacity={1} onLongPress={drag}>
      <DraggableProduct key={`${index}${item.id}`}
        item={item}
        isDragActive={isDragActive}
      />
    </TouchableOpacity>
  )
}

const renderSection = (item: any) => {
  if (!item) {
    return null;
  }
  const {
    name,
    id,
  } = item;

  if (id === -1) {
    return null;
  }

  return (
    <View key={id} style={styles.section}>
      {id > 0 &&
        <ProductCatalogeSectionHeader isEditDisplayOrder={true} text={name} />
      }
      {(!item.hasProducts) && <TypoGraphyOpenSans style={styles.no_products_hint} text={"Todavía no has añadido productos a esta sección"} />}
    </View>
  );
};

const renderItem = ({ item, index, drag, isActive }) => {
  return item.isSection ?
    renderSection(item)
    :
    renderProduct(item, index, drag, isActive);
}
const viewabilityConfig = { itemVisiblePercentThreshold: 100 };

function keyExtractor(item, index) {
  return `draggable-item-${item.isSection ? "section" : "product"}-${item.id}`;
}

const DisplayOrderCatalogCarteScreenComponent: React.FC<IProps> = (props) => {
  let flatListRef = React.useRef();
  let yplacement: any;
  let serverErrorAlertRef = React.useRef();

  React.useEffect(() => {
    yplacement = new Animated.Value(0);
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {BackHandler.removeEventListener('hardwareBackPress', backAction); }
  }, []);

  const backAction = () => {
    props.sendProductDisplayOrderUpdate();
    return true
  }

  const renderServerError = () => {
    const { error, errorDisplayOrder, removeError, sendProductDisplayOrderUpdate, cancelSendProductDisplayOrderUpdate } = props;
    if (errorDisplayOrder && errorDisplayOrder.status) {
      return (
        <ServerErrorAlert
          ref={ref => { serverErrorAlertRef = ref; }}
          isVisible={true}
          options={
            <ErrorUpdatingDisplayOrderAlerBox onPressRetry={() => sendProductDisplayOrderUpdate()} onPressCancel={() => cancelSendProductDisplayOrderUpdate()} />
          }
        />
      );
    }
    if (!error || !error.message || error.message === "") {
      return null;
    }

    return (
      <ServerErrorAlert
        ref={ref => { serverErrorAlertRef = ref; }}
        isVisible={true}
        options={
          <ServerErrorAlertDialog onPress={removeError} message={error.message} />
        }
      />
    );
  }

  const dragEndProduct = ({ data, from, to })  => {
    if (from === to) {
      return;
    }

    props.updateProductPairDisplayOrderCarteFromCatalog(data, to);
  }

  const renderProductCarteList = () => {
    const {
      orderedFlatListWithSectionsAndProducts,
      anyProductInDB,
    } = props;
    const AnimatedFlatList = {
      transform: [{ translateY: yplacement || 0 }]
    };

    if (!orderedFlatListWithSectionsAndProducts) {
      return <LoadingMessageDisplay />;
    }

    if (!anyProductInDB) {
      return (
        <View style={styles.fillScreen}>
        </View>
      );
    }


    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={[styles.flatListWithProducts, AnimatedFlatList]}>
          <DraggableFlatList
            ref={ref => flatListRef = ref}
            onStartShouldSetResponder={true}
            onResponderRelease={false}
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={50}
            initialNumToRender={30}
            viewabilityConfig={viewabilityConfig}
            data={orderedFlatListWithSectionsAndProducts}
            activationDistance={10}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onDragEnd={dragEndProduct}
          />
        </Animated.View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.fillScreen}>
      {renderServerError()}
      {renderProductCarteList()}
    </View>
  );
}

interface IPropsFromState {
  sectionsToDisplay: SectionWithProducts[];
  sections: SectionDTO[];
  catalogProducts: CatalogProductDTO[];
  errorDisplayOrder: any;
  error: any;
  orderedFlatListWithSectionsAndProducts: any;
}

interface IProps extends IPropsFromState, IOwnProps {
  updateProductPairDisplayOrderCarteFromCatalog: Function;
  sendProductDisplayOrderUpdate: Function;
  cancelSendProductDisplayOrderUpdate: Function;
  removeError: Function;
}

interface IOwnProps {
  anyProductInDB: boolean;
}

const mapStateToProps = (state: AppState, ownProps: IOwnProps): IPropsFromState => {
  return {
    sectionsToDisplay: state.filterCatalogCarte.sections || [],
    sections: state.providerCatalogProducts.sections.list || [],
    catalogProducts: state.providerCatalogProducts.productsCarte.list,
    errorDisplayOrder: state.providerCatalogProducts.productsCarte.error,
    error: state.providerCatalogProducts.error,
    orderedFlatListWithSectionsAndProducts: getOrderedSectionsWithProducts(state)  //getOrderedSectionsWithProducts(state)
  };
};

const sectionsInState = (state: AppState) => state.providerCatalogProducts.sections.list
const productsInState = (state: AppState) => state.providerCatalogProducts.productsCarte.list;

const getOrderedSectionsWithProducts = createSelector(
  [sectionsInState, productsInState], (sections: SectionDTO[], catalogProducts: CatalogProductDTO[]) => {
    let newList = [];

    const productsWithoutSection = catalogProducts.filter(x => x.sectionIds.length === 0);
    if (productsWithoutSection.length > 0) {
      const sectionWithoutProducts = { id: -1, name: "", displayOrder: -1, changeVersion: 0, isSection: true };
      newList.push(sectionWithoutProducts);
      newList = [...newList, ...productsWithoutSection];
    }

    sections.forEach(s => {
      const section = s;
      section['isSection'] = true;

      const productsForSection = catalogProducts.filter(x => x.sectionIds[0] === s.id).sort((a, b) => a.displayOrder - b.displayOrder);
      section['hasProducts'] = productsForSection.length > 0
      newList.push(section);
      newList = [...newList, ...productsForSection];
    })
    return newList;
  }
)


const mapDispathToProps = {
  updateProductPairDisplayOrderCarteFromCatalog,
  sendProductDisplayOrderUpdate,
  cancelSendProductDisplayOrderUpdate,
  removeError
};

const mergeProps = (propsFromState: IPropsFromState, propsFromDispatch: any, ownProps: IOwnProps) => {
  const anyProductInDB = propsFromState.catalogProducts && propsFromState.catalogProducts.length > 0;
  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    anyProductInDB
  };
};

const DisplayOrderCatalogCarteScreen = connect(
  mapStateToProps,
  mapDispathToProps,
  mergeProps
)(DisplayOrderCatalogCarteScreenComponent);

export { DisplayOrderCatalogCarteScreen };
