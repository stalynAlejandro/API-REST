import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  // ********** Main
  container: {
    backgroundColor: COLORS.main_background,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 21,
  },

  // ********** UI
  heading: {
    ...FONTSIZE.super_main,
    color: COLORS.main,
  },
  sub_heading: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main,
    marginTop: 36,
    marginBottom: 26
  },
  text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.black,
    marginBottom: 29
  },
  text_1: {
    ...FONTSIZE.secondary_small,
    color: COLORS.black,
    marginBottom: 20
  },
  text_2: {
    ...FONTSIZE.secondary_small,
    color: COLORS.black,
    marginBottom: 20
  },
  footer: {
    alignItems: 'center',
  },
  continue_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
  },
  step: {
    marginTop: 20
  },
  hint: {
    ...FONTSIZE.normal,
    marginBottom: 0,
    color: COLORS.neutral_super_strong,
  },
  code: {
    ...FONTSIZE.top_max,
    color: COLORS.main,
    marginBottom: 70,
    marginTop: 25,
  },
  code_wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 63,
    marginBottom: 48
  },
  btn_wrapper: {
    marginHorizontal: 20
    },
});

