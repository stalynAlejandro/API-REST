import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import {
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansLight,
  ProductImage
} from 'components';

import styles from './ClientProductListScreen.component.styles';

const ProductDetail = ({ 
  keyDetail, 
  detail,
  textStyle
}) => (
  <Text style={styles.detail_wrapper} numberOfLines={1}>
    <TypoGraphyOpenSans text={keyDetail} style={{...styles.detail,...textStyle}} />
    <TypoGraphyOpenSansLight text={detail} style={{...styles.detail, ...textStyle}} />
  </Text>
);

ProductDetail.propTypes = {
  keyDetail: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  detail: PropTypes.string.isRequired
};

export const ProductCard = ({ product, textStyle }) => (
  <View style={styles.product_card}>
    <View style={styles.image_wrapper}>
      <ProductImage imageUrl={product.image} size={styles.product_image} />
    </View>
    <View style={styles.product_detail}>
      <View>
        <TypoGraphyOpenSansSemiBold text={"Jamón en Lonchas 150 gr cortado NAVIDUL"} style={styles.productName} />
      </View>
      <View style={styles.product_detail_bottom}>
        {ProductDetail({ keyDetail: "REF: ", detail: product.ref, textStyle })}
        {ProductDetail({ keyDetail: "Formato: ", detail: product.format, textStyle})}
      </View>
    </View>
  </View>
);

ProductCard.propTypes = {
  textStyle: PropTypes.object,
  product: PropTypes.object.isRequired
};

export const TabHeading = ({ heading, tradeName }) => (
  <View style={styles.heading_wrapper}>
    <TypoGraphyOpenSansBold text={heading} style={styles.tab_heading} />
    <TypoGraphyOpenSans text={tradeName} style={styles.tradeName_heading} />
  </View>
);

TabHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  tradeName: PropTypes.string.isRequired
};