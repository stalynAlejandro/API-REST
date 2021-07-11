import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { 
  ProductImage,
  TouchableIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansSemiBold
} from 'components';

import styles from './RejectedProductScreen.component.styles';

export const SingleRejectedProduct = ({ product, onPressReActivate }) => (
  <View style={styles.product_container_background}>
    <View style={styles.product_container}>
      <View style={styles.photo_wrapper}>
        <ProductImage
          imageUrl={product.image}
          size={styles.photo}
        />
      </View>
      <View style={styles.product_info}>
        <View>
          <TypoGraphyOpenSansSemiBold text={product.name} style={styles.product_name} />
        </View>
        <View>
          <TypoGraphyOpenSans text={product.provider} style={styles.product_provider} />
        </View>
        <View style={styles.reactivate_wrapper}>
          <TouchableIcon
            onPress={(product) => onPressReActivate(product)}
            icon={<TypoGraphyOpenSansBold text={"Reactivar"} style={styles.reactivate} />}
          />
        </View>
      </View>
    </View>
  </View>
);

SingleRejectedProduct.propTypes = {
  product: PropTypes.object.isRequired,
  onPressReActivate: PropTypes.func.isRequired
};