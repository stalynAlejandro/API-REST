import React from 'react';
import PropTypes from 'prop-types';
import { 
  ScrollView,
  TextInput,
  View, 
} from 'react-native';
import { SIZE } from 'constants';
import {
  DualOptionButtons,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold,
  TouchableIcon,
  LocationListPanel,
  LongSquareButton,
} from 'components';

import styles from './ProductCRUDScreen.component.styles';
import DownArrowNoTail from '../../../assets/All_Icons/arrows/arrow_down_empty_noTail.svg';
import PencilIcon from '../../../assets/All_Icons/basic/pencil_large.svg';
import UpArrowNoTail from '../../../assets/All_Icons/arrows/arrow_up_empty_noTail.svg';

export const DeleteAlertBox = ({ onPressYes, onPressNo }) => (
  <View style={styles.delete_alert_wrapper}>
    <TypoGraphyOpenSans 
      text={"Si eliminas este producto, el proveedor no podrá volver a añadirlo de nuevo en tu lista."} 
      style={styles.delete_alert_text}
    />

    <TypoGraphyOpenSansBold 
      text={"¿Deseas eliminar este producto definitivamente?"}
      style={styles.delete_alert_text}
    />

    <DualOptionButtons
      textLeft={"Sí"}
      textRight={"No"}
      onPressLeft={() => onPressYes()}
      onPressRight={() => onPressNo()}
    />
  </View>
)

DeleteAlertBox.propTypes = {
  onPressYes: PropTypes.func.isRequired,
  onPressNo: PropTypes.func.isRequired,
}

const Provider = ({ provider, onPress, wrapperStyle }) => (
  <TouchableIcon
    key={`${provider.id}${provider.tradeName}`}
    onPress={() => onPress(provider.id)}
    styles={wrapperStyle}
    icon={<TypoGraphyOpenSansSemiBold style={styles.provider_name} text={provider.tradeName} />}
  />
);

Provider.propTypes = {
  provider: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  wrapperStyle: PropTypes.object.isRequired
};

export const SingleSelectedProviderOption = ({ provider, onPress }) => (
  Provider({ 
    provider,
    onPress,
    wrapperStyle: {...styles.option, ...styles.highlightBackground}
  })
);

export const SingleProviderOption = ({ provider, onPress }) => (
  Provider({ 
    provider,
    onPress,
    wrapperStyle: styles.option
  })
);

SingleProviderOption.propTypes = {
  provider: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export const ProviderList = ({ 
  onPressClose,
  displayProviderList
 }) => (
  <View style={styles.provider_list_container}>
    <View style={styles.header_container}>
      <View>
        <TypoGraphyOpenSansBold style={styles.primary_heading} text={"CAMBIAR PROVEEDOR"} />
        <TypoGraphyOpenSansLight
          style={styles.single_provider_list}
          text={"Selecciona un proveedor"}
        />
      </View>
      <TouchableIcon
        onPress={() => onPressClose()}
        icon={<UpArrowNoTail />}
      />
    </View>
    <ScrollView style={styles.fillScreen}>
      {displayProviderList}
    </ScrollView>
  </View>
);

ProviderList.propTypes = {
  onPressClose: PropTypes.func.isRequired,
  displayProviderList: PropTypes.array.isRequired
};

export const ProviderSelectionHeading = ({ onPressToggle, selectedProvider }) => (
  <View style={styles.providerSelection_container}>
    <View>
      <TypoGraphyOpenSansBold style={styles.primary_heading} text={"CAMBIAR PROVEEDOR"} />
      <TypoGraphyOpenSansLight
        style={styles.selected_provider_name}
        text={!selectedProvider || selectedProvider === '' ? "Pulsa para ver los proveedores disponibles" : selectedProvider}
      />
    </View>
    <TouchableIcon
      onPress={() => onPressToggle()}
      icon={<DownArrowNoTail />}
    />
  </View>
);

ProviderSelectionHeading.propTypes = {
  icon: PropTypes.any,
  onPressToggle: PropTypes.func.isRequired,
  selectedProvider: PropTypes.string
};

const pencilIcon = (onPressEditName) => (
  <TouchableIcon
    onPress={() => onPressEditName()}
    styles={styles.pencil_wrapper}
    icon={<PencilIcon {...SIZE.square_20} />}
  />
);

pencilIcon.propTypes = {
  onPressEditName: PropTypes.func.isRequired
};

export const ProductNameWithPlaceHolder = ({ onPressEditName }) => (
  <View style={styles.placeHolder_name}>
    <TypoGraphyOpenSans style={styles.fake_placeholder} text={"Escribe aquí el nombre del producto"} />
    {pencilIcon(onPressEditName)}
  </View>
);

ProductNameWithPlaceHolder.propTypes = {
  onPressEditName: PropTypes.func.isRequired
};

const ProductName = ({ 
  name, 
  onPressEditName,
  wrapperStyle
}) => (
  <View style={wrapperStyle}>
    <TypoGraphyOpenSansBold
      numberOfLines={2}
      style={styles.product_name}
      text={name}
    />
    {pencilIcon(onPressEditName)}
  </View>
);

ProductName.propTypes = {
  onPressEditName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  wrapperStyle: PropTypes.object.isRequired
};

export const ProductNameForEdit = ({ name, onPressEditName }) => (
  ProductName({
    name, 
    onPressEditName, 
    wrapperStyle: styles.edit_product_name
  })
);

export const LocationListHeading = () => (
  <View style={styles.locations_header}>
    <TypoGraphyOpenSansBold style={styles.primary_heading} text={"Lugares"} />
    <TypoGraphyOpenSans style={styles.secondary_heading} text={"Selecciona los lugares donde quieres añadir este producto"} />
  </View>
);

export const LocationList = ({
  locations,
  locationIds,
  locationDisplayHeight,
  onSelectLocation
}) => (
    <ScrollView
      horizontal={true}
      numColumnsnumber={3}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      <LocationListPanel
        onSelectLocation={(locationId) => onSelectLocation(locationId)}
        list={locations}
        selectedList={locationIds}
        locationDisplayHeight={60}
      />
    </ScrollView>
  );

LocationList.propTypes = {
  locations: PropTypes.array.isRequired,
  locationIds: PropTypes.array.isRequired,
  locationDisplayHeight: PropTypes.number.isRequired,
  onSelectLocation: PropTypes.func.isRequired,
};

export const DualButtonChoice = ({
  firstButton,
  secondButton,
  productHasChange
}) => (
    <View>
      <View style={styles.btn_wrapper}>
        <LongSquareButton
          btnText={firstButton.text}
          onPress={firstButton.method}
          btnStyle={firstButton.btnStyle}
        />
      </View>

      <View style={styles.btn_wrapper}>
        <LongSquareButton
          btnText={secondButton.text}
          onPress={secondButton.method}
          btnStyle={secondButton.btnStyle}
          disable={productHasChange ? !productHasChange : false}
        />
      </View>
    </View>
  );


DualButtonChoice.propTypes = {
  firstButton: PropTypes.object.isRequired,
  secondButton: PropTypes.object.isRequired,
  productHasChange: PropTypes.bool
};

export const ProductDetailInput =({ 
  title,
  value,
  placeholder,
  onChangeText,
  onPressSubmit,
  btnText,
}) => (
  <View style={styles.product_detail_input}>
    <TypoGraphyOpenSansBold style={styles.heading} text={title} />
    <View style={styles.input_wrapper}>
      <TextInput
        style={styles.input}
        autoFocus={true}
        placeholder={placeholder}
        onSubmitEditing={() => onPressSubmit()}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <PencilIcon {...SIZE.square_20} />
    </View>

    <TouchableIcon 
      onPress={() => onPressSubmit()}
      styles={styles.btn}
      icon={<TypoGraphyOpenSansBold style={styles.btn_text} text={btnText} />}
    />
  </View>
);

ProductDetailInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onPressSubmit: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
};

export const ProviderName = ({ providerName }) => (
  <TypoGraphyOpenSansBold style={styles.provider_heading_name} text={providerName} />
);

ProviderName.propTypes = {
  providerName: PropTypes.string.isRequired
};