import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansLightItalic
} from 'components';

import styles from './ApprovedOrderDetail.component.styles';

const ApprovedOrderDetail = ({
  orderNumber,
  provider,
  date,
  fontSize
}) => (
    <View style={styles.container}>
      <View>
        <TypoGraphyOpenSansBold
          style={{ ...styles.order_number, ...(fontSize ? fontSize.main : {}) }}
          text={`Pedido #${orderNumber}`}
        />
        <TypoGraphyOpenSansLight
          style={{ ...styles.provider_name, ...(fontSize ? fontSize.secondary : {}) }}
          text={provider}
        />
      </View>
      <View>
        <TypoGraphyOpenSansBold
          style={{ ...styles.delivery_heading, ...(fontSize ? fontSize.main : {}) }}
          text={"Previsión entrega"}
        />
        <TypoGraphyOpenSansLightItalic
          style={{ ...styles.deliver_date, ...(fontSize ? fontSize.secondary : {}) }}
          text={date}
        />
      </View>
    </View>
  );

ApprovedOrderDetail.propTypes = {
  fontSize: PropTypes.object,
  orderNumber: PropTypes.number.isRequired,
  provider: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export { ApprovedOrderDetail };