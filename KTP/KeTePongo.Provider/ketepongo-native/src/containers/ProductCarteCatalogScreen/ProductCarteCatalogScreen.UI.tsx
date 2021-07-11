import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Keyboard,
  Text
} from 'react-native';
import {
  CatalogCarteTopNavigator,
  CatalogCarteFilterConstrains,
  ErrorMessage,
  FilterBar,
  LongSquareButton,
  TouchableIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansWithHighlight,
  BackGreyArrowButton,
  DualOptionButtons,
  TitleSectionWithLeftAndOptionalRightButton
} from 'components';
import { BottomShadowLine } from 'shared';

import styles from './ProductCarteCatalogScreen.component.style';
import CartIcon from '../../../assets/All_Icons/basic/cart.svg';
import { SIZE, COLORS } from 'constants';

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

export const CatalogCarteHeaderWithFilter = ({
  displayFilterConstrains,
  filterCatalogCarteOptions,
  sectionDictionary,
  filterCatalogCarteRequestByKeyword,
  kindsOfFoodDictionary,
  allergensDictionary,
  value,
  hasToDisplayImpersonateButton
}) => {
  const component = (
    <View>
      <FilterBar
        onSubmit={()=>{}}
        onFilter={(text) => filterCatalogCarteRequestByKeyword(
          text
        )}
        placeholderText={"Buscar Productos"}
        value={value}
        hasToDisplayImpersonateButton={hasToDisplayImpersonateButton}
        />
      {displayFilterConstrains?
      <CatalogCarteFilterConstrains
      hasToDisplayFilterConstraints={displayFilterConstrains}
      filterCatalogCarteOptions={filterCatalogCarteOptions}
      sectionDictionary={sectionDictionary}
      kindsOfFoodDictionary={kindsOfFoodDictionary}
      allergensDictionary={allergensDictionary}
      />:  <CatalogCarteTopNavigator />}
    </View>
  );

  return BottomShadowLine({ component });
};

export const HeaderEditingDisplayOrder=({onPressBack, subText})=>{
  const component = (
    <View style={styles.drag_header_container}>
      <TitleSectionWithLeftAndOptionalRightButton
          leftButton={<BackGreyArrowButton onPress={() =>onPressBack()} />}
          headerText={"Ordenar Elementos "}
        />
        <TypoGraphyOpenSans style={styles.drag_subtext} text={subText} />
    </View>
  );

  return BottomShadowLine({ component });
}
export const ErrorUpdatingDisplayOrderAlerBox = ({ onPressRetry, onPressCancel }: any) => (
  <View style={styles.delete_alert_wrapper}>
    <TypoGraphyOpenSansBold
      text={"No se pudieron de guardar los cambios"}
      style={styles.delete_alert_text}
    />

    <DualOptionButtons
      textLeft={"Reintentar"}
      textRight={"Cancelar"}
      onPressLeft={() => onPressRetry()}
      onPressRight={() => onPressCancel()}
    />
  </View>
);
export const ServerErrorAlertDialog = ({
  onPress,
  message,
}) => (
    <View style={styles.confirm_alert_container}>
      <Text style={styles.regular_text}>{message}</Text>
      <LongSquareButton
        onPress={() => onPress()}
        btnText={<TypoGraphyOpenSansBold text={"Ok"} style={styles.main_btn_text} />}
        btnStyle={styles.blue_btn}
      />
    </View>
  );
