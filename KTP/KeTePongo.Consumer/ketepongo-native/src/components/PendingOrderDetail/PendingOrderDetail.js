import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TypoGraphyOpenSansBold, TypoGraphyOpenSansLightItalic } from 'components';

import styles from './PendingOrderDetail.component.styles';

export const PendingOrderDetail = ({
  orderNumber,
  provider,
  fontSize
}) => (
    <View style={styles.container}>
      <View>
        <TypoGraphyOpenSansBold
          style={{ ...styles.order_number, ...(fontSize ? fontSize.main : {}) }}
          text={`Pedido #${orderNumber}`}
        />
      </View>
      <View>
        <TypoGraphyOpenSansBold
          style={{ ...styles.validate_heading, ...(fontSize ? fontSize.main : {}) }}
          text={"Por Validar"}
        />
        <TypoGraphyOpenSansLightItalic
          style={{ ...styles.validate_provider, ...(fontSize ? fontSize.secondary : {}) }}
          text={`Proveedor ${provider}`}
        />
      </View>
    </View>
  );

PendingOrderDetail.propTypes = {
  fontSize: PropTypes.object,
  orderNumber: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
};
