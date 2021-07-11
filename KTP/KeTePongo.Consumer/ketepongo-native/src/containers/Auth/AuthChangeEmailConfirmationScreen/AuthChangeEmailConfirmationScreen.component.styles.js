import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants';

export default StyleSheet.create({
  // ********** Main
  container: {
    backgroundColor: COLORS.neutral_min,
    flex: 1,
    paddingTop: 15,
    paddingBottom: 41
  },
  fillScreen: {
    flex: 1,
    marginBottom: 50
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
    height: 50,
    width: '100%',
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
    color: COLORS.neutral_min,
    textAlign: 'center'
  },
  warningText_wrapper: {
    marginBottom: 55,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  warningText: {
    color: COLORS.main,
    ...FONTSIZE.small
  },
  warningText_hight: {
    color: COLORS.secondary,
    ...FONTSIZE.small,
    ...TYPOGRAPHY.openSans_bold,
  },
  stepper_icon: {
    alignItems: 'center',
    marginBottom: 43
  },
  continue_btn_wrapper: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 41
  },
  error_text: {
    color: COLORS.KO,
    ...FONTSIZE.secondary_small,
    paddingLeft: 33,
    paddingRight: 33,
  },
  btn_text: {
    ...FONTSIZE.secondary,
    color: COLORS.neutral_min,
  },
  buttonContinue: {
    position:'relative',
    alignSelf:'center',
    bottom: 60,
    width: '80%',
  }
});
