import React from "react";
import PropTypes from "prop-types";
import { View , StyleSheet, Platform} from "react-native";
import { COLORS } from "constants";
import { Controller } from "react-hook-form";
import { DefaultInputError, TouchableIcon } from "components";
import { FormInput } from "./DefaultHookFormTextInput.component.styles";
import PencilEdit from "../../../assets/All_Icons/basic/pencil_grey.svg";

const DefaultHookFormTextInput = ({
  placeholder,
  keyboardType,
  placeholderTextColor,
  textColor,
  borderColor,
  control,
  name,
  rules,
  defaultValue,
  watch,
  styles,
  errors,
  referencia,
  isHidden,
  ...extraProps

}) => {
  const keyboard = keyboardType ? keyboardType : "default";
   placeholderTextColor = placeholderTextColor
    ? placeholderTextColor
    : COLORS.neutral_medium_strong;

   textColor = textColor ??  COLORS.neutral_super_strong
   borderColor = borderColor ??  COLORS.main_secondary

  const onChange = args => {
    return args[0].nativeEvent.text ;
  };

  const watchInput = watch(name);
  const stylesInternal = StyleSheet.create({
    container_regular: {
      flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
    },
    container_hidden: {
      width:0,
      height:0,
      opacity: 0,
    },
    row:{
      flexDirection: 'row'
    },
    error:{
      marginTop: 4,
      marginBottom:17
    }
});


  return (
    <View style={isHidden? stylesInternal.container_hidden: stylesInternal.container_regular}>
      <View style={stylesInternal.row}>
        <Controller style={{width: '100%', paddingRight:20, paddingTop:Platform.OS === 'android'?11 : 26}}
          as={
            <FormInput
              ref={referencia}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              keyboardType={keyboard}
              {...extraProps}
              isEmpty={watchInput}
              borderColor={borderColor}
              errorColor={errors[name]}
              textColor={textColor}
              style={styles}
            />
          }
          control={control}
          name={name}
          onChange={onChange}
          rules={rules}
          defaultValue={defaultValue}
        />
        <TouchableIcon
        onPress={() => { referencia.current.focus(); }}
        icon={<PencilEdit style={{width: '10%', marginLeft:-20, marginTop:21}} />}
      />

    </View>
      <DefaultInputError
        errorMessage={errors[name]?.message}
        style={stylesInternal.error}
      />
    </View>
  );
};

DefaultHookFormTextInput.propTypes = {
  styles: PropTypes.any,
  errors: PropTypes.any,
  placeholder: PropTypes.string.isRequired,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  control: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  isHidden : PropTypes.bool.isRequired
};

export { DefaultHookFormTextInput };
