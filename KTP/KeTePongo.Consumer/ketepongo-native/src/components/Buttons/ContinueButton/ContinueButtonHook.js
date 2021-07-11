import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { LongSquareButton, TypoGraphyOpenSansSemiBold } from "components";
import { COLORS, FONTSIZE } from "constants";

const styles = StyleSheet.create({
  continue_btn_wrapper: {
    marginLeft: 16,
    marginRight: 16
  },
  btn_text: {
    ...FONTSIZE.secondary,
    color: COLORS.neutral_min
  }
});

const ContinueButtonHook = ({ onPress, text }) => {
  return (
    <View style={styles.continue_btn_wrapper}>
      <LongSquareButton
        btnText={
          <TypoGraphyOpenSansSemiBold
            text={text}
            style={styles.btn_text}
          />
        }
        onPress={onPress}
      />
    </View>
  );
};

ContinueButtonHook.propTypes = {
  onPress: PropTypes.func.isRequired,
  text:PropTypes.string.isRequired
};

export { ContinueButtonHook };
