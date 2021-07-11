import { StyleSheet } from "react-native";
import { FONTSIZE, COLORS, LAYOUT, TYPOGRAPHY } from "constants";

export default StyleSheet.create({
  //  ********** Main
  container: {
    backgroundColor: COLORS.neutral_min,
    flex: 1,
    paddingTop: 25
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  body: {
    paddingLeft: 31,
    paddingRight: 31,
  },
  fillScreen: {
    flex: 1
  },
  btn_wrapper: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  footer_wrapper: {
    marginBottom: 22,
    marginLeft: 25,
    marginRight: 25,
  },
  error: {
    backgroundColor: COLORS.KO,
    color: COLORS.neutral_min
  },
  error_text: {
    color: COLORS.KO,
    ...FONTSIZE.secondary_small
  },
  //  ********** UI

  continue_btn_wrapper: {
    marginTop: 10
  },
  enter_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min
  },
  heading: {
    ...FONTSIZE.super_main,
    color: COLORS.main,
    marginTop: 56,
    marginBottom: 41,
    paddingLeft: 31,
    lineHeight: 27
  },
  not_allowed_container: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 166,
    width: 294,
    height: 249,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  not_allowed_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  not_allowed_middle: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
 
  ok_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_small
  },
  ok_button: {
    backgroundColor: COLORS.main,
    height: 40,
    width: 132,
    ...TYPOGRAPHY.openSans_bold
  },
});
