import React from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SIZE, COLORS } from "constants";
import {
  DualOptionButtons,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold,
  TouchableIcon,
  LocationListPanel,
  LongSquareButton,
  DefaultCheckBox,
  TypoGraphyOpenSansItalic,
} from "components";

import styles from "./ProductCarteCRUDScreen.component.styles";
import DownArrowNoTail from "../../../assets/All_Icons/arrows/arrow_down_empty_noTail.svg";
import PencilIcon from "../../../assets/All_Icons/basic/pencil_large.svg";
import UpArrowNoTail from "../../../assets/All_Icons/arrows/arrow_up_empty_noTail.svg";
import CloseIcon from "../../../assets/All_Icons/symbols/x_grey.svg";

export const DialogAlertBox = ({
  message,
  yesText,
  noText,
  onPressYes,
  onPressNo,
}) => (
  <View style={styles.delete_alert_wrapper}>
    <TypoGraphyOpenSansBold text={message} style={styles.delete_alert_text} />

    <DualOptionButtons
      textLeft={yesText}
      textRight={noText}
      onPressLeft={() => onPressYes()}
      onPressRight={() => onPressNo()}
    />
  </View>
);

export const ProductCarteDetailInputPlaceHolder = ({ text }) => (
  <View style={styles.input_text_container}>
    <TypoGraphyOpenSans style={styles.fake_placeholder} text={text} />
    {<PencilIcon style={styles.pencil_icon} {...SIZE.square_20} />}
  </View>
);

export const ProductCarteInput = React.forwardRef(
  ({ onChange, label, ...inputProps }, ref) => {
    const { text, placeholder, isRequired } = inputProps;

    return (
      <View style={styles.body_scroll_element}>
        <FieldLabel label={label} />
        <View style={styles.input_text_container}>
          <TextInput
            style={styles.input_text}
            onChangeText={(t) => onChange(t)}
            placeholder={placeholder}
            ref={ref}
            value={text.toString()}
            {...inputProps}
          />
          <TouchableIcon
            styles={{ justifyContent: "flex-end" }}
            onPress={() => {
              ref.current.focus();
            }}
            icon={
              <PencilIcon style={styles.pencil_icon} {...SIZE.square_20} />
            }
          />
        </View>
        {isRequired && (
          <TypoGraphyOpenSansItalic
            style={styles.field_required_hint}
            text={"Este campo es obligatorio"}
          />
        )}
      </View>
    );
  }
);

const FieldLabel = ({ label }) => (
  <View>
    <TypoGraphyOpenSansBold style={styles.field_label} text={label} />
  </View>
);

export const SectionListHeading = ({ headerText, text }) => (
  <View style={styles.sections_header}>
    <TypoGraphyOpenSansBold style={styles.primary_heading} text={headerText} />
    <TypoGraphyOpenSans style={styles.secondary_heading} text={text} />
  </View>
);

export const SectionList = React.forwardRef((props, ref) => {
  const { sections, sectionIds, sectionDisplayHeight, onSelectSection } = props;

  return (
    <ScrollView
      horizontal={true}
      numColumns={3}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      keyboardShouldPersistTaps={"handled"}
      ref={ref}
    >
      <LocationListPanel
        onSelectLocation={(sectionId) => onSelectSection(sectionId)}
        list={sections}
        selectedList={sectionIds}
        locationDisplayHeight={sectionDisplayHeight}
      />
    </ScrollView>
  );
});

export const DualButtonChoice = ({ secondButton, isEdited }) => (
  <View style={styles.btn_wrapper}>
    {/* <View >
      <LongSquareButton
        btnText={firstButton.text}
        onPress={firstButton.method}
        btnStyle={firstButton.btnStyle}
      />
    </View> */}

    <LongSquareButton
      btnText={secondButton.text}
      onPress={secondButton.method}
      btnStyle={secondButton.btnStyle}
      disable={isEdited ? false : true}
    />
  </View>
);

export const SectionDialog = ({
  title,
  value,
  placeholder,
  onChangeText,
  onPressSubmit,
  btnText,
  disabled,
  onCloseSection,
}) => {
  let textInput = React.createRef();
  return (
    <View style={styles.product_detail_input}>
      <TypoGraphyOpenSansBold style={styles.heading} text={title} />
      <KeyboardAvoidingView>
        <View style={styles.input_wrapper}>
          <TextInput
            style={styles.input}
            autoFocus={true}
            placeholder={placeholder}
            ref={(input) => {
              textInput = input;
            }}
            onSubmitEditing={() => onPressSubmit()}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            keyboardType={Platform.OS==="android"?"text":"ascii-capable"}
          />
          <TouchableIcon
            onPress={() => {
              textInput.focus();
            }}
            icon={<PencilIcon style={styles.pencil_icon} {...SIZE.square_20} />}
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableIcon
        disabled={disabled}
        onPress={() => onPressSubmit()}
        styles={disabled ? styles.btn_disabled : styles.btn}
        icon={
          <TypoGraphyOpenSansBold
            style={disabled ? styles.btn_text_disabled : styles.btn_text}
            text={btnText}
          />
        }
      />
      <TouchableIcon
        styles={styles.closeButton}
        icon={<CloseIcon width={30} height={30} onPress={onCloseSection} />}
      />
    </View>
  );
};
/**/

export const ProductVeganSelection = ({ value, onValueChange }) => (
  <View style={{ ...styles.body_scroll_element, ...styles.vegan_container }}>
    <View style={styles.vegan_info_container}>
      <FieldLabel label={"Vegano"} />
      <TypoGraphyOpenSans
        style={styles.vegan_description}
        text={"Señala si este es un producto apto para veganos"}
      />
    </View>
    <DefaultCheckBox
      style={styles.vegan_checkbox}
      value={value}
      onValueChange={onValueChange}
    />
  </View>
);
export const ProductHiddenSelection = ({ value, onValueChange }) => (
  <View style={{ ...styles.body_scroll_element, ...styles.vegan_container }}>
    <View style={{...styles.vegan_info_container,...styles.product_hidden_container}}>
      <FieldLabel label={"Ocultar Producto"} />
      <TypoGraphyOpenSans
        style={styles.vegan_description}
        text={"Puedes ocultar este producto de manera momentánea en la carta del cliente si te has quedado sin stock. Desmarca esta casilla para volver a mostrar el producto"}
      />
    </View>
    <DefaultCheckBox
      style={styles.vegan_checkbox}
      value={value}
      onValueChange={onValueChange}
    />
  </View>
);
