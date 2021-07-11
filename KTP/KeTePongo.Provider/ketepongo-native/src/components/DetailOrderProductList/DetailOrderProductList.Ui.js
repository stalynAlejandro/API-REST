import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import {
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold
} from 'components';

import styles from './DetailOrderProductList.component.styles';
import CameraIcon from '../../../assets/All_Icons/basic/camera.svg';

export const ProductImage = ({ imageUrl }) => (
  <View style={styles.image_wrapper}>
    <Image style={styles.image} source={{ uri: imageUrl }} />
  </View>
);

ProductImage.propTypes = {
  imageUrl: PropTypes.string.isRequired
};

export const NoProductImage = () => (
  <View style={styles.image_wrapper}>
    <CameraIcon />
  </View>
);

const ProductName = ({ name }) => (
  <View style={styles.name_wrapper}>
    <TypoGraphyOpenSansBold style={styles.product_name} text={name} />
  </View>
);

ProductName.propTypes = {
  name: PropTypes.string.isRequired
};

export const ProductInformation = ({
  image,
  name,
  productRef,
  quantity
}) => (
  <View style={styles.product_wrapper}>
    {image}
    <View style={styles.product_right}>
      <View style={styles.product_right_top}>
        {ProductName({ name })}
        <View>
          <TypoGraphyOpenSansSemiBold style={styles.quantity} text={`x${quantity}`}/>
        </View>
      </View>
      <View style={styles.ref_wrapper}>
        <TypoGraphyOpenSans style={styles.refereces} text={"REF: "} />
        <TypoGraphyOpenSansLight style={styles.refereces} text={productRef} />
      </View>
    </View>
  </View>
);

ProductInformation.propTypes = {
  image: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  productRef: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export const ProductRejected = ({
  image,
  name,
  quantity
}) => (
  <View style={styles.warningBackground}>
    <View style={styles.product_wrapper}>
      {image}
      <View style={styles.product_right}>
        <View style={styles.product_right_top}>
          {ProductName({ name })}
          <View>
            <TypoGraphyOpenSansSemiBold style={styles.quantity} text={`x${quantity}`}/>
          </View>
        </View>
        <TypoGraphyOpenSansSemiBold style={styles.rejected} text={"Rechazado"} />
      </View>
    </View>
  </View>
);

ProductRejected.propTypes = {
  image: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};