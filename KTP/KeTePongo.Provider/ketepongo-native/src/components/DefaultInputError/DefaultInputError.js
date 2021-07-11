import React from "react";
import { StyleSheet } from "react-native";
import { FONTSIZE, COLORS } from "constants";
import { TypoGraphyOpenSans } from "components";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  error_text: {
    color: COLORS.KO,
    ...FONTSIZE.normal
  }
});

const DefaultInputError = ({ errorMessage, ...props }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <TypoGraphyOpenSans
      style={
        props.style
          ? { ...styles.error_text, ...props.style }
          : styles.error_text
      }
      text={errorMessage}
    />
  );
};

DefaultInputError.propTypes = {
  props: PropTypes.object,
  errorMessage: PropTypes.string
};

export { DefaultInputError };
