import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import {
  ConditionalBackground,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  OrderDateDisplay,
  OrderTotalSkuDisplay,
  ValidateButton,
  WatchButton,
  WatchWarningButton
} from 'components';

import styles from './OrderCard.component.styles';

const renderButton = ({ order, navigate}) => {
  if (!order) {
    return <View />;
  }

  const { 
    finished,
    approved,
    validate
  } = order;

  if (finished) {
    return <WatchButton onPress={() => navigate()} />;
  }

  if (validate && validate.length > 0) {
    return <WatchWarningButton onPress={() => navigate()} />;
  }

  if (!approved && validate.length === 0) {
    return <ValidateButton onPress={() => navigate()} />;
  }
};

export const OrderCard = ({ 
  isValid,
  order, 
  navigate 
}) => (
  <ConditionalBackground
    isValid={isValid}
    component={(
      <View style={styles.singleOrder_wrapper}>
        <View style={styles.section_name}>
          <TypoGraphyOpenSansBold style={styles.order_client} text={order.tradeName} />
          <TypoGraphyOpenSans style={styles.order_number} text={`Pedido #${order.orderNumber}`} />
        </View>
        <View style={styles.section_date}>
          <OrderDateDisplay orderDate={order.date} />

          <OrderTotalSkuDisplay numberOfSku={order.products.length || 0} />
        </View>
        <View style={styles.section_validate}>
          {renderButton({ order, navigate })}
        </View>
      </View>
    )}
  />
);

OrderCard.propTypes = {
  isValid: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
};
