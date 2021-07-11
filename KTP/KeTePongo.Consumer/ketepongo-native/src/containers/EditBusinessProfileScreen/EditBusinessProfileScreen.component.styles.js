import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from 'constants';

export default StyleSheet.create({
  // ********** Main
  container: {
    backgroundColor: COLORS.main_background,
    paddingTop: 50,
    paddingBottom: 90
  },
  fillScreen: {
    flex: 1
  },
  continue_btn_wrapper: {
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  btnStyle: {
    color: COLORS.neutral_min,
    backgroundColor: COLORS.main,
    marginRight: 16
  },
  btnStyle_disabled: {
    color: COLORS.neutral_strong,
    backgroundColor: COLORS.neutral_medium,
    marginRight: 16
  },

  btn_text: {
    ...FONTSIZE.secondary,
    color: COLORS.neutral_min
  },
  btn_text_disabled: {
    ...FONTSIZE.secondary,
    color: COLORS.neutral_strong
  },
  // ********** UI

  stepper_icon: {
    alignItems: 'center',
    marginBottom: 43
  },
  heading: {
    ...FONTSIZE.super_main,
    color: COLORS.neutral_min,
    paddingLeft: 33,
    marginTop: 56,
    marginBottom: 8,
  },
  header_title: {
    ...FONTSIZE.secondary_large,
    color: COLORS.black,
    textAlign: 'center',
    position: 'absolute'
  },
  secondary_text: {
    ...FONTSIZE.normal,
    color: COLORS.neutral_min,
    marginBottom: 10,
    paddingLeft: 33,
  },
  header_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_section: {
    flex: 1,
    marginLeft: 30
  },
  back_arrow_wrapper: {
    ...SIZE.square_19,
    borderRadius: 100
  },
  back_arrow: {
    ...SIZE.square_19
  },
  header_logo_wrapper: {
    flex: 1,
    alignItems: 'center'
  },
  header_logo: {
    height: 26,
    width: 103
  },
  header_height: {
    height: 59
  }
});
