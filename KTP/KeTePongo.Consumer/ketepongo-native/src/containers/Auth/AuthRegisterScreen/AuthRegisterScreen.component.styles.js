import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS, LAYOUT } from "constants";

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral_min,
    flex: 1,
    paddingTop: 15,
    flexDirection:"column",
    justifyContent:'space-between'
  },
  background:{
    position: 'absolute',
    top: 0,
    left: 0
  },
  heading: {
    ...FONTSIZE.super_main,
    color: COLORS.main,
    marginTop: 56,
    marginBottom: 50,
    paddingLeft: 33,
  },
  fillScreen: {
    flex: 1,
  },
  body: {
    paddingLeft: 33,
    paddingRight: 33,

  },
  stepper_icon: {
    alignItems: 'center',
    marginVertical: 23
  },
  extra_margin: {
    marginTop: LAYOUT.WINDOW.height - 590
  },
  error_text: {
    color: COLORS.KO,
    ...FONTSIZE.secondary_small
  }
});
