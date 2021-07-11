import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY,LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********** Main
  container: {
    backgroundColor: COLORS.neutral_min,
    flex: 1,
    paddingTop: 15,
  },
  fillScreen: {
    flex: 1,
    marginBottom: 50
  },
  background:{
    position: 'absolute',
    top: 0,
    left: 0
  },

  // ********** UI

  heading: {
    ...FONTSIZE.super_main,
    color: COLORS.main,
    marginBottom: 8,
    paddingLeft: 33,
    marginTop: 56,
  },
  secondaryText: {
    ...FONTSIZE.medium,
    color: COLORS.main,
    marginBottom: 100,
    paddingLeft: 33,
    paddingRight: 33,
    lineHeight: 16
  },
  input_wrapper: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingBottom: 0,
    width: 37,
    height: 50,
    margin: 5,
    ...FONTSIZE.max_super,
    ...TYPOGRAPHY.openSans_semi_bold,
    color: COLORS.main,
    textAlign: 'center'
  },
  warningText_wrapper: {
    marginBottom: 55,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  warningText: {
    color: COLORS.main,
    ...FONTSIZE.small
  },
  warningText_hight: {
    color: COLORS.main,
    ...FONTSIZE.small,
    ...TYPOGRAPHY.openSans_bold,
  },
  stepper_icon: {
    alignItems: 'center',
    marginVertical: 23,
  },
  continue_btn_wrapper: {
    marginLeft: 25,
    marginRight: 25
  },
  error_text: {
    color: COLORS.KO,
    ...FONTSIZE.secondary_small,
    paddingLeft: 33,
    paddingRight: 33,
  },
  verification_container: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 166,
    width: 294,
    height: 219,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  verification_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  // ********* UI
  verification_middle: {
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
