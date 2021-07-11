import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTSIZE, SIZE, LAYOUT } from "constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral_min
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1
  },
  qr_image: {
    alignSelf: "center",
    flex: 1,
    width: 300,
    height: 300,
    marginTop: 10
  },
  hint_container: {
    flexDirection: "row",
  },
  hint_body: {
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_super_strong,
    lineHeight: 19
  },
  share_button:{
    marginBottom: 16,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.main
  },
  share_button_text:{
    color: COLORS.main,
    ...FONTSIZE.secondary_large,
    lineHeight: 22
  }
});
