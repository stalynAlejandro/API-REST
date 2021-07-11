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

import styles from './ProviderCoverPhoto.component.styles';
import MainCameraIcon from '../../../assets/All_Icons/basic/main_camera.svg';
import PencilEdit from '../../../assets/All_Icons/basic/pencil_medium.svg';
import TrashIcon from '../../../assets/All_Icons/trash.svg';
import ImagePicker from 'react-native-image-picker';
const onPressEditImage = (onSetImage) => {
  const options = {
    title: 'Elige una opcion',
    takePhotoButtonTitle: 'Hacer foto con camara',
    chooseFromLibraryButtonTitle: 'Elegir foto guardadas',
    quality: 1,
    maxWidth: 600,
    maxHeight: 600,
    cameraType: 'front',
    mediaType: 'photo',
    noData: true,
    storageOptions: {
    skipBackup: true,
    path: 'ASSETS',
    cameraRoll: true,
    },
  };

  ImagePicker.showImagePicker(options, (response) => {

    if (response.didCancel) {
    // @TODO - log into analytics console.log('User cancelled image picker');
    } else if (response.error) {
    // @TODO - log into analytics console.log('ImagePicker Error: ', response.error);
    } else {

  //   data.imageUrl= response.uri
      onSetImage(response);

    }
  })
  }
export const NoImageProviderCoverPhoto = ({ onSetImage }) => (
  <View style={styles.noPhoto_wrapper}>
    {/* <View style={styles.btns_wrapper}>
      <BackRoundButton onPressBack={() => onPressBack()} btnStyle={styles.backButton} />
    </View> */}
    <View style={styles.icon_wrapper} >
      <TouchableIcon
        onPress={() => onPressEditImage(onSetImage)}
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

NoImageProviderCoverPhoto.propTypes = {
};

export const ImageProviderCoverPhoto = ({
  onChange,
  value,
  onRemove
}) => (
    <View style={styles.image_wrapper}>
      <Image resizeMode={"cover"} source={{ uri: value }} style={styles.image} />
      <View style={styles.btns_wrapper}>
        <TouchableIcon
          onPress={() => onRemove()}
          styles={styles.pencil_wrapper}
          icon={<TrashIcon {...SIZE.square_15} />}
        />
        <TouchableIcon
          onPress={() => onPressEditImage(onChange)}
          styles={styles.pencil_wrapper}
          icon={<PencilEdit {...SIZE.square_15} />}
        />
      </View>
    </View>
  );

ImageProviderCoverPhoto.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
