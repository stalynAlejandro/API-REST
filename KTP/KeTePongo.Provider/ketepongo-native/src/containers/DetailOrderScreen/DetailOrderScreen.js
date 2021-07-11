import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, ScrollView } from 'react-native';
import {
  LogoWithBurguerWithTitleSectionHeader,
  ApprovedOrderDetail,
  PendingOrderDetail,
  DetailOrderProductList,
  OrderDateDisplay,
  OrderTotalSkuDisplay
} from 'components';

import styles from './DetailOrderScreen.component.styles';
import { navigateBack } from '../../store/order';
import { withAuthentication } from "../../HOC";

class DetailOrderScreen extends React.Component {

  renderOrderStatus = () => {
    const { order, providerDictionary } = this.props;

    if (!order) {
      return null;
    }

    const {
      approved,
      id,
      consumerOID,
      minimumDeliveryDateTime,
      providerName
    } = order;

    const fontSize = {
      main: styles.main_heading,
      secondary: styles.secondary_heading
    };

    // @TODO - Need to add Provider dictionary to check tradeName with commerceId
    if (approved) {
      return (
        <ApprovedOrderDetail
          orderNumber={id}
          provider={providerName}
          date={moment(minimumDeliveryDateTime).format("DD/MM/YYYY")}
          fontSize={fontSize}
        />
      );
    }

    return (
      <PendingOrderDetail
        orderNumber={id}
        provider={providerName}
        fontSize={fontSize}
      />
    );
  };

  render() {
    const {
      styles,
      order,
      navigateBack
    } = this.props;
    const { productLines, orderLines } = order;

    return (
      <View style={styles.container}>
        <LogoWithBurguerWithTitleSectionHeader
          onPressBack={() => navigateBack()}
          headerText={"Mis Pedidos"}
        />
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.status}>
              <View style={styles.status_left}>
                {this.renderOrderStatus()}
              </View>
              <View style={styles.status_right}>
                <View style={styles.status_date_wrapper}>
                  <OrderDateDisplay orderDate={order.minimumDeliveryDateTime} />
                </View>
                <OrderTotalSkuDisplay numberOfSku={productLines.length || 0} />
              </View>
            </View>
            <View style={styles.order_product_list_container}>
              <DetailOrderProductList productLines={productLines} orderLines={orderLines} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

DetailOrderScreen.defaultProps = {
  styles
};

DetailOrderScreen.propTypes = {
  order: PropTypes.object.isRequired,
  navigateBack: PropTypes.func.isRequired,
  providerDictionary: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    order: state.order.detailOrder,
    providerDictionary: state.consumption.providers.dictionary
  };
};

const mapDispatchToProps = {
  navigateBack
};

DetailOrderScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(DetailOrderScreen)));

export { DetailOrderScreen };
