import CheckBox from '@react-native-community/checkbox';
import React from "react";
import { Platform } from "react-native";
import {COLORS} from "constants";

export const DefaultCheckBox = ({value, onValueChange, style})=>{
  if(Platform.OS === 'android'){
      return <CheckBox style={style} value={value} onValueChange={onValueChange} tintColors={{ true: COLORS.main, false: COLORS.main}}/>

  }
  return (<CheckBox style={style} value={value} onValueChange={onValueChange} tintColor={COLORS.main} onCheckColor={
    COLORS.neutral_min} onFillColor={COLORS.main} onTintColor={COLORS.main} boxType="square"/>)
}
