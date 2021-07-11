import React from "react";
import { View, ScrollView } from "react-native";
import { DefaultAlert } from "../../components";
import {
  CartHeader,
  OrderDetail,
  OrderViewSelector,
  OrderSingleProductWithoutObservationBox,
  OrderSingleProductWithObservationBox,
  CloseCategoryNameHeading,
  OpenCategoryHeadingAndProductList,
  CommentTouchable,
  CommentSelectedTouchable,
  ProductHeadingWithoutLocation,
  ProductHeadingWithLocationAndQuantity,
  ArrowDown,
  ArrowUp,
  CartActionButtons,
  AlertMakingOrderDisplay,
  AlertErrorOrder
} from "./CartScreen.UI";

import styles from "./CartScreen.component.styles";
import { ICurrentOrderLine } from "../../store/order";
import { IProps, IState, OrderByParameter } from "./CartScreenContainer";

const AlertMakingOrder = React.forwardRef((props, ref) => (
  <DefaultAlert ref={ref} {...props} />
));
AlertMakingOrder.displayName = "AlertMakingOrder";
const OrderConfirmed = React.forwardRef((props, ref) => (
  <DefaultAlert ref={ref} {...props} />
));
OrderConfirmed.displayName = "OrderConfirmed";

export class CartScreenComponent extends React.Component<IProps, IState> {
  alertMakingOrderRef = React.createRef();
  cartMenuRef = React.createRef();
  alertDeleteOrderRef = React.createRef();
  alertErrorOrderRef = React.createRef();

  state: IState = {
    radioOptions: [
      { label: "Todos", value: 0 },
      { label: "Proveedor", value: 1 },
      { label: "Ubicación", value: 2 }
    ],
    orderListSelection: 0,
    selectedProvider: undefined,
    selectedLocation: undefined,
    observationProductId: undefined,
    productObservation: ""
  };

  componentDidUpdate(prevProps: IProps) {
    if (this.props.hasSentNewOrderSuccesfullyToServer) {
      this.props.navigateToMyOrders();
    }
    if(this.props.hasErroredSendingOrder){
      this.alertErrorOrderRef.open();
      this.props.resetOrderServerStatus();
    }
  }

  hideProductObservation = () => this.setState({ observationProductId: undefined });

  transformLocationsIdsIntoString = (orderLineLocations: number[]) => {
    const { locationDictionary } = this.props;

    return orderLineLocations
      .map(locId =>
        locationDictionary[locId] ? locationDictionary[locId].name : ""
      )
      .join(" ,");
  };

  renderObservationIcon = (observation: string, id) => {
    if (!observation || observation === "") {
      return (
        <CommentTouchable
          onPress={() => this.setState({ observationProductId: id })}
        />
      );
    }

    return (
      <CommentSelectedTouchable
        onPress={() => this.setState({ observationProductId: id })}
      />
    );
  };
  renderSingleProductOrder = (
    orderLine: ICurrentOrderLine,
    index: number,
    hasToDisplayLocationHeading: boolean
  ) => {
    if (orderLine === null || orderLine === {}) {
      return null;
    }
    const {
      addProductToOrderRequest,
      reduceProductFromOrderRequest,
      updateObservationToProductOrder
    } = this.props;
    const { observationProductId } = this.state;
    const { product, quantity, observation } = orderLine;
    const { id, name, locationsIds } = product;
    let orderProductHeading;

    if (hasToDisplayLocationHeading && locationsIds.length > 0) {
      const location = this.transformLocationsIdsIntoString(locationsIds);
      orderProductHeading = (
        <ProductHeadingWithLocationAndQuantity
          name={name}
          quantity={quantity}
          location={location}
        />
      );
    } else {
      orderProductHeading = (
        <ProductHeadingWithoutLocation name={name} quantity={quantity} />
      );
    }

    if (observationProductId !== orderLine.product.id) {
      return (
        <OrderSingleProductWithoutObservationBox
          orderLine={orderLine}
          key={index}
          index={index}
          observationIcon={this.renderObservationIcon(observation, id)}
          orderProductHeading={orderProductHeading}
          onPressMinus={() => reduceProductFromOrderRequest(product)}
          onPressPlus={() => addProductToOrderRequest(product)}
        />
      );
    } else {
      return (
        <OrderSingleProductWithObservationBox
          orderLine={orderLine}
          key={index}
          index={index}
          observationIcon={
            <CommentSelectedTouchable
              onPress={() => this.hideProductObservation()}
            />
          }
          onPressCancel={() => this.hideProductObservation()}
          onPressSave={(observation: string) =>
            updateObservationToProductOrder({
              productId: id,
              productObservation: observation,
              closeCommentbox: () =>
                this.setState({ observationProductId: undefined })
            })
          }
          orderProductHeading={orderProductHeading}
          onPressMinus={() => reduceProductFromOrderRequest(product)}
          onPressPlus={() => addProductToOrderRequest(product)}
        />
      );
    }
  };

  renderCategoryOrderDisplay = (
    hasToDisplayLocationHeading: boolean,
    selectedCategory: string,
    sortedNestedArray: OrderByParameter[],
    onPressShowList: Function,
    onPressHideList: Function
  ) => {
    const lastIndex = sortedNestedArray.length - 1;
    return sortedNestedArray.map((categoryOrder, index) => {
      const { name, list } = categoryOrder;
      if (selectedCategory !== categoryOrder.name) {
        return (
          <View key={index}>
            <CloseCategoryNameHeading
              name={name}
              date={"Proximo Viernes"}
              arrowIcon={
                <ArrowDown onPress={() => onPressShowList(name)} />
              }
              lastHeading={lastIndex === index}
            />
          </View>
        );
      } else {
        const orderList = list.map((orderLine, index) => {
          return this.renderSingleProductOrder(
            orderLine,
            index,
            hasToDisplayLocationHeading
          );
        });

        return (
          <View style={styles.provider_list} key={index}>
            <OpenCategoryHeadingAndProductList
              name={name}
              date={"Proximo Viernes"}
              arrowIcon={<ArrowUp onPress={() => onPressHideList()} />}
              list={orderList}
              lastHeading={lastIndex === index}
            />
          </View>
        );
      }
    });
  };

  renderOrderByLocation = () =>
    this.renderCategoryOrderDisplay(
      true,
      this.state.selectedLocation,
      this.props.currentOrderByLocation,
      (name: string) =>
        this.setState({ selectedLocation: name, observationProductId: undefined }),
      () => this.setState({ selectedLocation: undefined })
    );

  renderOrderByProvider = () =>
    this.renderCategoryOrderDisplay(
      false,
      this.state.selectedProvider,
      this.props.currentOrderByProvider,
      (name: string) =>
        this.setState({ selectedProvider: name, observationProductId: undefined }),
      () => this.setState({ selectedProvider: undefined })
    );

  renderList = () => {
    const { orderListSelection } = this.state;
    const { currentOrder } = this.props;
    const { orderLines, productLines } = currentOrder;
    if (orderListSelection === 0) {
      return productLines.map((productId, index) => {
        if (productId === null) {
          return null;
        }

        let orderLine = orderLines[productId];
        return this.renderSingleProductOrder(orderLine, index, false);
      });
    }

    if (orderListSelection === 1) {
      return this.renderOrderByProvider();
    }

    if (orderListSelection === 2) {
      return this.renderOrderByLocation();
    }
    return null;
  };

  onPressConfirmOrder = () => {
    this.alertMakingOrderRef.close();
    this.props.createOrder();
  };

  renderOrderError = () => {
    return (<AlertMakingOrder
      ref={ref => (this.alertMakingOrderRef = ref)}
      options={
        <AlertMakingOrderDisplay
          onPressYes={() => this.onPressConfirmOrder()}
          onPressNo={() => this.alertMakingOrderRef.close()}
        />
      }
    />)
  }

  renderMakeOrderAlert = () => (
    <AlertMakingOrder
    ref={ref => (this.alertErrorOrderRef = ref)}
    options={
      <AlertErrorOrder onPressOk={() => this.alertErrorOrderRef.close()} />
    }
  />
  );

  render() {
    const { radioOptions, orderListSelection } = this.state;
    const {
      navigateBackToCatalog,
      numberOfSkus,
      numberOfProviders,
      isWaitingAnswerFromServer
    } = this.props;

    return (
      <View style={styles.container}>
        {this.renderMakeOrderAlert()}
        {this.renderOrderError()}
        <CartHeader onPressBack={() => navigateBackToCatalog()} />
        <View style={styles.body}>
          <View style={styles.summary}>
            <OrderDetail
              numberOfSkus={numberOfSkus}
              numberOfProviders={numberOfProviders}
            />

            <OrderViewSelector
              radioOptions={radioOptions}
              orderListSelection={orderListSelection}
              onPressSelect={value =>
                this.setState({ orderListSelection: value })
              }
            />
          </View>
          <ScrollView>
            <View style={styles.container}>{this.renderList()}</View>
          </ScrollView>
          <View style={styles.empty_space} />
          <CartActionButtons
            onPressContinueOrdering={() => this.alertMakingOrderRef.open()}
            onPressReturn={() => navigateBackToCatalog()}
            isWaitingAnswerFromServer={isWaitingAnswerFromServer}
          />
        </View>
        {/* TODO - Reprogram the control of back arrow to Catalog products */}
      </View>
    );
  }
}
