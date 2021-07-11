import React from "react";
import { View, TextInput } from "react-native";
import styles from "./DefaultAcceptCancelDialog.component.styles";

import {
  TypoGraphyOpenSansBold,
  DefaultAlert,
  DualOptionButtons
} from "components";


export const DefaultAcceptCancelDialog = ({onPressOut, text, onPressOk, onPressCancel}) => (
  <DefaultAlert
    isVisible={true}
    onPressOut={onPressOut}
    options={
      <DialogContent
        onPressOk={onPressOk}
        onPressCancel={onPressCancel}
        text={text}
      />
    }
  />
);


const DialogContent = ({
  onPressOk,
  onPressCancel,
  text,
}) => {
  return (
    <View style={styles.delete_alert_wrapper}>
      <TypoGraphyOpenSansBold
        text={text}
        style={styles.delete_alert_text}
      />

      <DualOptionButtons
        textLeft={"Sí"}
        textRight={"No"}
        onPressLeft={() => onPressOk()}
        onPressRight={() => onPressCancel()}
      />
    </View>
  );
};
