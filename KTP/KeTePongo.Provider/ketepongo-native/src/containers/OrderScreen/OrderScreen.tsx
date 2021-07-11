import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { STRINGS } from "constants";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { LogoWithBurguerMenu, OrderList, DefaultAlert } from "components";
import { AppState } from "store";
import { resetOrderServerStatus, IOrder } from "../../store/order";

import styles from "./OrderScreen.component.styles";
import {
  TabLabelFocused,
  TabLabelNotFocused,
  AlertConfirmOrderHasbeenMade
} from "./OrderScreen.UI";
import { withAuthentication } from "../../HOC";

const AlertMakingOrder = React.forwardRef((props, ref) => (
  <DefaultAlert ref={ref} {...props} />
));
AlertMakingOrder.displayName = "AlertMakingOrder";

class OrderScreenComponent extends React.Component<IProps, {}> {
  state = {
    index: 0,
    routes: [
      //TODO check why this throws if removed and type it if is needed
      { key: STRINGS.all, title: STRINGS.all },
      { key: STRINGS.pending, title: STRINGS.pending }
    ]
  };
  alertOrderConfirmedRef = React.createRef();

  componentDidUpdate(prevProps: IProps) {
    if (this.props.hasSentNewOrderSuccesfullyToServer) {
      this.alertOrderConfirmedRef.open();
      this.props.resetOrderServerStatus();
    }
  }

  renderConfirmOrderAlert = () => (
    <AlertMakingOrder
      ref={ref => (this.alertOrderConfirmedRef = ref)}
      options={
        <AlertConfirmOrderHasbeenMade onPressOk={() => this.confirmedOrder()} />
      }
    />
  );

  confirmedOrder = () => {
    this.alertOrderConfirmedRef.close();
    //TODO implement here
  };

  render() {
    const { styles, orderList, pendingList } = this.props;

    if (!styles) {
      return (
        <View>
          <Text>Cargando...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <LogoWithBurguerMenu />
        {this.renderConfirmOrderAlert()}
        <TabView
          style={styles.tab_container}
          navigationState={this.state}
          onIndexChange={index => this.setState({ index })}
          initialLayout={styles.initialLayout}
          renderScene={SceneMap({
            [STRINGS.all]: () => (
              <OrderList orderList={orderList} heading={"MIS PEDIDOS"} />
            ),
            [STRINGS.pending]: () => (
              <OrderList
                orderList={pendingList || []}
                heading={"PEDIDOS PENDIENTES"}
              />
            )
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              activeColor={styles.tab_color}
              inactiveColor={styles.tab_color}
              style={styles.tab_style}
              indicatorStyle={styles.indicatorStyle}
              renderLabel={({ route, focused }) =>
                focused ? (
                  <TabLabelFocused route={route} />
                ) : (
                  <TabLabelNotFocused route={route} />
                )
              }
            />
          )}
        />
      </View>
    );
  }
}

OrderScreenComponent.defaultProps = {
  styles
};

OrderScreenComponent.propTypes = {
  orderList: PropTypes.array.isRequired,
  pendingList: PropTypes.array.isRequired,
  hasSentNewOrderSuccesfullyToServer: PropTypes.bool,
  styles: PropTypes.object.isRequired,
  resetOrderServerStatus: PropTypes.func.isRequired
};

interface IPropsFromState {
  orderList: IOrder[];
  pendingList: IOrder[];
  hasSentNewOrderSuccesfullyToServer: boolean;
}

interface IProps extends IPropsFromState {
  resetOrderServerStatus: Function;
}

const mapStateToProps = (state: AppState): IPropsFromState => {
  return {
    orderList: state.order.list || [],
    pendingList: state.order.pending || [],
    hasSentNewOrderSuccesfullyToServer:
      state.order.hasSentNewOrderSuccesfullyToServer
  };
};

const mapDispatchToProps = {
  resetOrderServerStatus
};

export const OrderScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderScreenComponent)));
