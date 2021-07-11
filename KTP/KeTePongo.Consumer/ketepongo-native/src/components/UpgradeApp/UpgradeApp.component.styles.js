import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTSIZE, LAYOUT } from "constants";

export default StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0
  },
  dialog_container: {
    ...LAYOUT.defaultAlert,
    borderRadius: 5,
    width: 294,
    height: 168,
    left: (Dimensions.get("window").width - 294) / 2,
    top: (Dimensions.get("window").height - 168) / 2,
    paddingVertical: 24,
    backgroundColor: "#F7F7F7"
  },
  dialog_text: {
    fontWeight: "normal",
    ...FONTSIZE.secondary_small,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 19,
    marginTop: 5,
    color: "black"
  },
  button: {
    ...FONTSIZE.secondary_large,
    lineHeight: 22,
    backgroundColor: COLORS.main,
    color: COLORS.neutral_min,
    marginTop: 32,
    width: 123,
    borderRadius: 3,
    paddingVertical: 11,
    textAlign: "center"
  }
});
