import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';

import styles from './OrderList.component.styles';
import {
  ValidatedOrderItemDisplay,
  NotValidatedOrderItemDisplay,
  HeadingDisplay
} from './OrderList.UI';
import { loadSingleOrder } from '../../store/order';
import { IOrder } from "../../store/order";

class OrderListComponent extends React.Component<IProps,{}> {
  renderOrderList = () => {
    const { orderList, loadSingleOrder } = this.props;

    return orderList.map((order, index) => {//TODO useMemo for performance
      if (order.isValidated) {
        return (
          <ValidatedOrderItemDisplay
            key={index}
            order={order}
            onPress={(order) => loadSingleOrder(order)}
          />
        );
      }

      return (
        <NotValidatedOrderItemDisplay
          key={index}
          order={order}
          onPress={(order) => loadSingleOrder(order)}
        />
      );
    });
  };

  render() {
    const {
      orderList,
      heading
    } = this.props;

    if (!orderList) {
      return null;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <HeadingDisplay heading={heading} />
          {this.renderOrderList()}
          <View style={styles.add_bottom_padding} />
        </View>
      </ScrollView>
    );
  }
}

OrderListComponent.defaultProps = {
  styles
};

OrderListComponent.propTypes = {
  heading: PropTypes.string.isRequired,
  orderList: PropTypes.array.isRequired,
  loadSingleOrder: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

interface IProps extends IPropsFroMDispatch{
  heading: string;
  orderList: IOrder[],
}

interface IPropsFroMDispatch{
  loadSingleOrder: Function;
}

const mapDispatchToProps = {
  loadSingleOrder
};

export const OrderList = connect(null, mapDispatchToProps)(OrderListComponent);
