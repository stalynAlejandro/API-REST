import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { SIZE, COLORS } from 'constants';

import MainCameraIcon from '../../../assets/All_Icons/basic/main_camera.svg';

const ProductImage = ({ imageUrl, size }) => {
  return (
    <View style={{ flex: 1}}>
      <View style={{ ...styles.image_wrapper, ...size }}>
        {imageUrl ?
          <Image style={{ ...styles.image, ...size }} source={{ uri: imageUrl }} />
          :
          <MainCameraIcon {...SIZE.square_35} />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image_wrapper: {
    ...SIZE.square_125,
    borderRadius: 5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    })
  },
  image: {
    borderRadius: 5,
    ...SIZE.square_125,
  }
});

ProductImage.propTypes = {
  imageUrl: PropTypes.string,
  size: PropTypes.object.isRequired
};

export { ProductImage };