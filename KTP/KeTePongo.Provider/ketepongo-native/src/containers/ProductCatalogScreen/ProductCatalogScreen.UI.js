import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Keyboard,
  Text
} from 'react-native';
import {
  CatalogTopNavigator,
  CatalogFilterConstrains,
  ErrorMessage,
  FilterBar,
  LongSquareButton,
  TouchableIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansWithHighlight,
} from 'components';
import { BottomShadowLine } from 'shared';

import styles from './ProductCatalogScreen.component.style';
import CartIcon from '../../../assets/All_Icons/basic/cart.svg';

export const DisplayCart = ({ numberOfSku, onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    styles={styles.cart_wrapper}
    icon={(
      <View style={styles.center_items}>
        <TypoGraphyOpenSansBold text={numberOfSku} style={styles.sku_number} />
        <CartIcon {...styles.cart_icon} />
      </View>
    )}
    accessibilityRole="button" 
  />
);

DisplayCart.propTypes = {
  numberOfSku: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
};

export const DisplayErrorMessage = ({ error, mainBtn }) => (
  <View style={styles.errorMessage}>
    <ErrorMessage errorMessage={error} mainBtn={mainBtn} />
  </View>
);

DisplayErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
  mainBtn: PropTypes.object.isRequired
};

export const CatalogHeader = ({ filterCatalogRequest }) => {
  const component = (
    <View>
      <FilterBar
        onSubmit={Keyboard.dismiss}
        onFilter={(text) => filterCatalogRequest({
          keyword: text,
          locationId: -1,
          providerId: -1,
          weekdays: [-1]
        })}
        placeholderText={"Buscar Productos"}
      />
      <CatalogTopNavigator />
    </View>
  );

  return BottomShadowLine({ component });
};

CatalogHeader.propTypes = {
  filterCatalogRequest: PropTypes.func.isRequired
};

export const CatalogHeaderWithFilter = ({
  displayFilterConstrains,
  filterCatalogOptions,
  locationDictionary,
  providerDictionary,
  filterCatalogRequest
}) => {
  const component = (
    <View>
      <FilterBar
        onSubmit={Keyboard.dismiss}
        onFilter={(text) => filterCatalogRequest({
          keyword: text,
          locationId: -1,
          providerId: -1,
          weekdays: [-1]
        })}
        placeholderText={"Buscar Productos"}
      />

      <CatalogFilterConstrains
        displayFilterConstrains={displayFilterConstrains}
        filterCatalogOptions={filterCatalogOptions}
        locationDictionary={locationDictionary}
        providerDictionary={providerDictionary}
      />
    </View>
  );

  return BottomShadowLine({ component });
};

CatalogHeaderWithFilter.propTypes = {
  displayFilterConstrains: PropTypes.bool.isRequired,
  filterCatalogOptions: PropTypes.object,
  locationDictionary: PropTypes.object.isRequired,
  providerDictionary: PropTypes.object.isRequired,
  filterCatalogRequest: PropTypes.func.isRequired,
};

export const ConfirmProductHasBeenAdded = ({
  onPressOk,
  productName,
  productProvider
}) => (
    <View style={styles.confirm_alert_container}>
      <TypoGraphyOpenSans text={"¡ENHORABUENA!"} style={styles.body_alert_text} />

      <Text numberOfLines={3} style={styles.body_alert_text}>
        <Text style={styles.regular_text}>Has añadido </Text>
        <Text style={styles.bold_text}>{` '${productName}' `}</Text>
        <Text style={styles.regular_text}>de</Text>
        <Text style={styles.bold_text}>{` '${productProvider}' `}</Text>
        <Text style={styles.regular_text}>a tu lista de productos.</Text>
      </Text>


      <LongSquareButton
        onPress={() => onPressOk()}
        btnText={<TypoGraphyOpenSansBold text={"Ok"} style={styles.main_btn_text} />}
        btnStyle={styles.blue_btn}
      />
    </View>
  );

ConfirmProductHasBeenAdded.propTypes = {
  productName: PropTypes.string.isRequired,
  productProvider: PropTypes.string.isRequired,
  onPressOk: PropTypes.func.isRequired
};
