import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Keyboard,
  Text
} from 'react-native';
import RadioForm,
{
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
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
const RadioOption = ({
  index,
  option,
  providerCatalogListSelection,
  onPressSelect
}) => (
  <View style={styles.radio_wrapper} key={index}>
    <RadioButton labelHorizontal={true}>
      <RadioButtonInput
        obj={option}
        index={index}
        isSelected={providerCatalogListSelection === option.value}
        onPress={(value) => onPressSelect(value)}
        borderWidth={1}
        buttonInnerColor={COLORS.neutral_min}
        buttonOuterColor={COLORS.neutral}
        buttonSize={10}
        buttonOuterSize={20}
        buttonStyle={providerCatalogListSelection === option.value ? styles.radio_selected : styles.radio_white}
        buttonWrapStyle={index === 0 ? {} : { marginLeft: 10 }}
      />
      <RadioButtonLabel
        obj={option}
        index={index}
        labelHorizontal={true}
        onPress={(value) => onPressSelect(value)}
        labelStyle={styles.radio_option_label}
      />
    </RadioButton>
  </View>
);

export const ProviderCatalogViewSelector = ({
  radioOptions,
  providerCatalogListSelection,
  onPressSelect
}) => (
  <RadioForm
    formHorizontal={true}
    animation={true}
  >
    <View style={styles.radio_option_wrapper}>
      {radioOptions.map((option, index) =>
        RadioOption({
          option,
          index,
          providerCatalogListSelection,
          onPressSelect
        }))
      }
    </View>
  </RadioForm>
);
export const CatalogCarteHeaderWithFilter = ({
  displayFilterConstrains,
  filterCatalogCarteOptions,
  sectionDictionary,
  filterCatalogCarteRequestByKeyword,
  kindsOfFoodDictionary,
  allergensDictionary,
  value,
  goBackTo,
  goToFilters
}) => {
  const component = (
    
      <FilterBar
        onSubmit={()=>{}}
        onFilter={(text) => filterCatalogCarteRequestByKeyword(
          text
        )}
        placeholderText={"Buscar Productos"}
        value={value}
        goBackTo={goBackTo}
        goToFilters={goToFilters}
        />
      
    
  );

  return component;
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
