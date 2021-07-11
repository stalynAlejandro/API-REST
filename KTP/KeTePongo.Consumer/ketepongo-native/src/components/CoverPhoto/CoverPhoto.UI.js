import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { SIZE } from 'constants';
import {
  BackRoundButton,
  TouchableIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansLight
} from 'components';

import styles from './CoverPhoto.component.styles';
import MainCameraIcon from '../../../assets/All_Icons/basic/main_camera.svg';
import PencilEdit from '../../../assets/All_Icons/basic/pencil_medium.svg';

export const NoImageCoverPhoto = ({ onPressBack, onPressUpload }) => (
  <View style={styles.noPhoto_wrapper}>
    <View style={styles.btns_wrapper}>
      <BackRoundButton onPressBack={() => onPressBack()} btnStyle={styles.backButton} />
    </View>
    <View style={styles.icon_wrapper} >
      <TouchableIcon
        onPress={() => onPressUpload()}
        styles={{}}
        icon={(
          <View style={styles.center}>
            <MainCameraIcon {...SIZE.square_75} />
            <TypoGraphyOpenSans text={"AÑADIR"} style={styles.add_text} />
            <TypoGraphyOpenSans text={"IMAGEN"} style={styles.add_text} />
          </View>
        )}
        selectedProperty={""}
      />
    </View>
  </View>
);

NoImageCoverPhoto.propTypes = {
  onPressBack: PropTypes.func.isRequired,
  onPressUpload: PropTypes.func.isRequired,
};

export const ImageCoverPhoto = ({
  onPressBack,
  onPressUpload,
  imageUrl
}) => (
    <View style={styles.image_wrapper}>
      <View style={styles.btns_wrapper}>
        <BackRoundButton onPressBack={() => onPressBack()} btnStyle={styles.backButton} />
        <TouchableIcon
          onPress={() => onPressUpload()}
          styles={styles.pencil_wrapper}
          icon={<PencilEdit {...SIZE.square_15} />}
        />
      </View>
      <Image resizeMode={"cover"} source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );

ImageCoverPhoto.propTypes = {
  onPressBack: PropTypes.func.isRequired,
  onPressUpload: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

const ProviderCoverPhoto = ({
  onPressBack,
  onPressUpload,
  image,
  providerInfo
}) => (
  <View style={styles.image_wrapper}>
    <View style={styles.info_wrapper}>
       <TypoGraphyOpenSansSemiBold style={styles.heading} text={providerInfo.providerName} />
       <TypoGraphyOpenSansLight style={styles.secondary} text={`Ref. ${providerInfo.ref}`} />
    </View>
    <View style={styles.btns_wrapper}>
      <BackRoundButton onPressBack={() => onPressBack()} btnStyle={styles.backButton} />
      <TouchableIcon
        onPress={() => onPressUpload()}
        styles={styles.pencil_wrapper}
        icon={<PencilEdit {...SIZE.square_15} />}
      />
    </View>
    {image}
  </View>
);

ProviderCoverPhoto.propTypes = {
  providerInfo: PropTypes.object.isRequired,
  onPressBack: PropTypes.func.isRequired,
  onPressUpload: PropTypes.func.isRequired,
  image: PropTypes.element,
};

export const ImageCoverPhotoWithProvider = ({
  onPressBack,
  onPressUpload,
  imageUrl,
  providerInfo
}) => ProviderCoverPhoto({
  onPressBack,
  onPressUpload,
  image: <Image resizeMode={"cover"} source={{ uri: imageUrl }} style={styles.image} />,
  providerInfo
});

ImageCoverPhotoWithProvider.propTypes = {
  providerInfo: PropTypes.object.isRequired,
  onPressBack: PropTypes.func.isRequired,
  onPressUpload: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export const ImageCoverNoPhotoWithProvider = ({
  onPressBack,
  onPressUpload,
  providerInfo
}) => ProviderCoverPhoto({
  onPressBack,
  onPressUpload,
  image: <View style={styles.image} />,
  providerInfo
});