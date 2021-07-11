import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  // ********** Main
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 21,
  },

  // ********** UI
  heading: {
    alignItems: 'center',
    transform: [{scale: 1.2}]
  },
  sub_heading: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main,
    marginTop: 36,
    marginBottom: 26
  },
  text: {
    ...FONTSIZE.main_large,
    color: COLORS.black,
    marginBottom: 29,
    textAlign: 'center',
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
    marginTop: 10
  },
  hint: {
    ...FONTSIZE.normal,
    marginBottom: 0,
    color: COLORS.neutral_super_strong,
  },
  code: {
    ...FONTSIZE.top_max,
    color: COLORS.main,
    marginBottom: 20,
    marginTop: 25,
  },
  code_wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_wrapper: {
    justifyContent: 'center',
    marginTop: 6,
    transform: [{scale: 1.1}],
  },
  btn_wrapper: {
    marginHorizontal: 20
    },
  btn_style: {
    backgroundColor: COLORS.main_strong,
    height: 48,
  }
});

