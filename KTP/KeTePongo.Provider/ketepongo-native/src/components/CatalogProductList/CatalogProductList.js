import React from "react";
import { connect } from "react-redux";
import { View, Animated } from "react-native";
import PropTypes from "prop-types";
import { DefaultAlert, DefaultFlatList } from "components";
import {
  TransitionNoProducts,
  LoadingMessageDisplay,
  SingleCatalogProductWithEditButton,
  SingleCatalogProductWithComment,
  SingleCatalogProductWithBlankComment,
  CommentBox
} from "./CatalogProductList.Ui";

import styles from "./CatalogProductList.component.styles";
import {
  navigateToProviderSelect,
  navigateToEditProduct
} from "../../store/consumption/products";
import { updateObservationToProductOrder } from "../../store/order";
import { ComponentFactory } from 'shared';


const ProductCommentBox = ComponentFactory("ProductCommentBox", "DefaultAlert");
const CatalogFlatList = ComponentFactory("CatalogFlatList", "DefaultFlatList");

class CatalogProductList extends React.PureComponent {
  flatListRef = React.createRef();
  productCommentBoxRef = React.createRef();

  state = {
    productId: "",
    productComment: ""
  };

  componentDidMount() {
    this.yplacement = new Animated.Value(0);
    this.props.onRef(this);
  }

  componentWillUnmount = () => this.props.onRef(undefined);

  onStartBounceAnimation = ({ changed }) => {
    const { numberOfProductDisplay } = this.props;
    if (changed[0].index === numberOfProductDisplay - 1) {
      Animated.sequence([
        Animated.timing(this.yplacement, {
          toValue: 15,
          duration: 300
        }),
        Animated.timing(this.yplacement, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.yplacement, {
          toValue: 10,
          duration: 200
        }),
        Animated.timing(this.yplacement, {
          toValue: 0,
          duration: 200
        }),
        Animated.timing(this.yplacement, {
          toValue: 5,
          duration: 100
        }),
        Animated.timing(this.yplacement, {
          toValue: 0,
          duration: 100
        })
      ]).start();
    }
  };

  scrollToTop = () => {
    if (this.props.productsToDisplay.length > 2) {
      this.flatListRef.defaultFlatList.scrollToOffset({
        animated: true,
        offset: 0
      });
    }
  };

  renderSingleProduct = (item, index) => {
    if (!item) {
      return null;
    }

    const {
      providerDictionary,
      locationDictionary,
      navigateToEditProduct,
      orderLines,
      productsToDisplay
    } = this.props;
    const {
      locationsIds,
      providerId,
      id
    } = item;

    let providerName = "";
    if (providerDictionary[providerId]) {
      providerName = providerDictionary[providerId].tradeName;
    }
    let locationList = "";
    const numberLocations = locationsIds.length || 0;
    locationsIds.map((loc, index) => {
      if (!locationDictionary[loc]) {
        return;
      }

      if (index === numberLocations - 1) {
        return (locationList += ` ${locationDictionary[loc].name}`);
      }

      return (locationList += ` ${locationDictionary[loc].name}, `);
    });

    const orderLineQuantity = orderLines[id] ? orderLines[id].quantity : 0;
    if (orderLineQuantity === 0) {
      return (
        <SingleCatalogProductWithEditButton
          lastItem={index === productsToDisplay.length - 1 && orderLines !== {}}
          index={index}
          item={item}
          providerName={providerName}
          locationList={locationList}
          navigateToEditProduct={productId => navigateToEditProduct(productId)}
          orderLineQuantity={orderLineQuantity}
        />
      );
    }

    const orderLineComment = orderLines[id] ? orderLines[id].observation : "";
    return (
      <SingleCatalogProductWithComment
        lastItem={index === productsToDisplay.length - 1}
        index={index}
        item={item}
        providerName={providerName}
        locationList={locationList}
        openCommentBoxForOrderLine={id =>
          this.renderProductCommentAlert({ id })
        }
        orderLineQuantity={orderLineQuantity}
        isEmpty={orderLineComment}
      />
    );

  };

  renderProductList = () => {
    const {
      productsToDisplay,
      numberOfProductDisplay,
      navigateToProviderSelect,
      styles
    } = this.props;
    const AnimatedFlatList = {
      transform: [{ translateY: this.yplacement || 0 }]
    };

    if (!productsToDisplay) {
      return <LoadingMessageDisplay />;
    }

    if (numberOfProductDisplay === 0) {
      return (
        <View style={styles.fillScreen}>
          <TransitionNoProducts
            navigateToProviderSelect={navigateToProviderSelect}
          />
        </View>
      );
    }

    return (
      <Animated.View style={[styles.flatlist, AnimatedFlatList]}>
        <CatalogFlatList
          ref={ref => {
            this.flatListRef = ref;
          }}
          onStartShouldSetResponder={true}
          onResponderRelease={false}
          onViewableItemsChanged={this.onStartBounceAnimation}
          list={productsToDisplay}
          renderSingleListItem={({ item, index }) =>
            this.renderSingleProduct(item, index)
          }
        />
      </Animated.View>
    );
  };

  onPressCancelComment = () => {
    this.productCommentBoxRef.close();
    this.setState({ productComment: "", productId: "" });
  };

  closeCommentbox = () => {this.productCommentBoxRef.close()};
  openCommentbox = () => {this.productCommentBoxRef.open()};

  onPressSaveComment = () => {
    const { productId, productComment } = this.state;
    this.props.updateObservationToProductOrder({
      productId,
      productComment,
      closeCommentbox
    });
  };

  renderProductCommentAlert = ({ id }) => {
    if (id) {
      const { orderLines } = this.props;
      const orderLineComment = orderLines[id].observation || "";
      this.setState({ productId: id, productComment: orderLineComment });
      openCommentbox();
    }

    return (
      <ProductCommentBox
        ref={ref => {
          this.productCommentBoxRef = ref;
        }}
        options={
          <CommentBox
            onPressCancel={this.onPressCancelComment}
            onPressSave={this.onPressSaveComment}
            onChangeText={productComment => this.setState({ productComment })}
            comment={this.state.productComment || ""}
          />
        }
      />
    );
  };

  render = () => (
    <View style={this.props.styles.fillScreen}>
      {this.renderProductCommentAlert({ id: undefined })}
      {this.renderProductList()}
    </View>
  );
}

CatalogProductList.defaultProps = {
  styles
};

CatalogProductList.propTypes = {
  onRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(CatalogProductList) })
  ]),
  numberOfProductDisplay: PropTypes.number.isRequired,
  locationDictionary: PropTypes.object.isRequired,
  providerDictionary: PropTypes.object.isRequired,
  productsToDisplay: PropTypes.array.isRequired,
  orderLines: PropTypes.object.isRequired,
  navigateToProviderSelect: PropTypes.func.isRequired,
  navigateToEditProduct: PropTypes.func.isRequired,
  updateObservationToProductOrder: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    productsToDisplay: state.filterCatalog.products || [],
    orderLines: ownProps.orderLines
  };
};

const mapDispathToProps = {
  navigateToProviderSelect,
  navigateToEditProduct,
  updateObservationToProductOrder
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const productsToDisplay = propsFromState.productsToDisplay || [];

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    productsToDisplay,
    numberOfProductDisplay: productsToDisplay.length || 0
  };
};

CatalogProductList = connect(
  mapStateToProps,
  mapDispathToProps,
  mergeProps
)(CatalogProductList);

export { CatalogProductList };
