import React from 'react';
import PropTypes from 'prop-types';
import { ASSETS } from 'assets';
import {
  Image, 
  Text,
  TextInput,
  View, 
} from 'react-native';
import {
  DualOptionButtons,
  TouchableIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold
} from 'components';

import styles from './ProviderCRUDScreen.component.styles';

import PencilIcon from '../../../assets/All_Icons/basic/pencil_large.svg';
import LinkedIcon from '../../../assets/All_Icons/basic/linked_blue.svg';

export const EliminateTouchable = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={(
      <View style={styles.delete_wrapper}>
        <Image source={ASSETS.trash_grey} style={styles.trash_icon} />
        <TypoGraphyOpenSansSemiBold text={"Eliminar Proveedor"} style={styles.eliminate_text} />
      </View>
    )}
  />
);

EliminateTouchable.propTypes = {
 onPress: PropTypes.func.isRequired
};

export const ThereAreSomeErrors = () => (
  <TypoGraphyOpenSans text={"Ha ocurrido algún error"} style={styles.error_btn} />
);

export const ErrorBlank = () => (
  <TypoGraphyOpenSans text={"*Debes rellenar este campo para continuar"} style={styles.error} />
);

export const ProviderIsLinked = ({ tradeName }) => (
  <View style={styles.linked_wrapper}>
    <Text numberOfLines={1} style={styles.provider_linked}>
      <TypoGraphyOpenSansLight text={"El proveedor "} />
      <TypoGraphyOpenSansBold text={tradeName} />
      <TypoGraphyOpenSansLight text={" está enlazado."} />
    </Text>
    <LinkedIcon />
  </View>
);

ProviderIsLinked.propTypes = {
  tradeName: PropTypes.string.isRequired
};

export const Input = ({ 
  bottomBorderStyle,
  onChangeText, 
  value,
  placeholder
}) => (
  <TextInput
    onChangeText={(text) => onChangeText(text)}
    value={value}
    placeholder={placeholder}
    style={{...styles.input, ...bottomBorderStyle}}
  />
);

Input.propTypes = {
  bottomBorderStyle: PropTypes.object,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export const TouchablePencilIcon = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={<PencilIcon />}
  />
);

TouchablePencilIcon.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const ProviderUnchangeableData = ({ info }) => (
  <View style={styles.info_wrapper}>
    <TypoGraphyOpenSans text={info} style={styles.info}/>
  </View>
);

ProviderUnchangeableData.propTypes = {
  info: PropTypes.string.isRequired
};

export const InputHeading = ({ heading }) => (
  <View>
    <TypoGraphyOpenSansBold text={heading} style={styles.input_heading} />
  </View>
);

InputHeading.propTypes = {
  heading: PropTypes.string.isRequired
};

export const MainHeading = () => (
  <TypoGraphyOpenSansSemiBold text={"DATOS DEL PROVEEDOR"} style={styles.heading} />
);

export const AlertDeleteBox = ({ onPressConfirm, onPressCancel, productsToDelete }) => (
  <View style={styles.alert_container_deleteProvider}>
    <TypoGraphyOpenSansBold 
      text={"¿Deseas eliminar este proveedor de tu lista de proveedores?"} 
      style={styles.alert_text} />

    { (productsToDelete.length > 0) ? 
     <TypoGraphyOpenSansBold 
     text={ "Se eliminarán los productos que se añadieron de este proveedor." } 
     style={styles.alert_text_products} />
    :
     <TypoGraphyOpenSansBold 
     text={ "Este proveedor no tiene productos asociados..." } 
     style={styles.alert_text_products} />
    }

    <DualOptionButtons
      textLeft={"Sí"}
      textRight={"No"}
      onPressLeft={() => onPressConfirm()}
      onPressRight={() => onPressCancel()}
    />
  </View>
);

AlertDeleteBox.propTypes = {
  onPressCancel: PropTypes.func.isRequired,
  onPressConfirm: PropTypes.func.isRequired
}
