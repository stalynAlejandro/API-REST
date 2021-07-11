import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS, TYPOGRAPHY } from 'constants';

export default StyleSheet.create({
  //  ********** Main
  container: {
    backgroundColor: COLORS.main,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 28
  },
  body: {
    paddingLeft: 33,
    paddingRight: 33,
    flex: 1
  },
  input: {
    borderBottomColor: COLORS.neutral_min,
    borderBottomWidth: 1,
    paddingBottom: 0,
    color: COLORS.neutral_min,
    marginBottom: 30,
    ...TYPOGRAPHY.openSans_semi_bold,
    ...FONTSIZE.medium,
  },
  input_empty: {
    ...TYPOGRAPHY.openSans_light,
    color: COLORS.neutral,
    ...FONTSIZE.medium,
  },
  skip_btn_wrapper: {
    paddingLeft: 25, 
    paddingRight: 25
  },
  jump_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_small
  },
  jumpBtn: {
    backgroundColor: COLORS.main,
    borderColor: COLORS.neutral_min,
    borderWidth: 1,
    marginBottom: 18,
  },
  less_margin: {
    marginBottom: 15
  },

  //  ********** UI

  stepper_icon: {
    alignItems: 'center',
    marginBottom: 29
  },
  secondary_heading_wrapper: {
    marginBottom: 10
  },
  first_parragraph: {
    marginBottom: 10,
  },
  secondary_text: {
    ...FONTSIZE.medium,
    color: COLORS.neutral_min,
    marginBottom: 10,
    ...TYPOGRAPHY.openSans_light
  },
  secondary_text_high: {
    ...TYPOGRAPHY.openSans_semi_bold
  },
  heading: {
    ...FONTSIZE.super_main,
    color: COLORS.neutral_min,
    paddingTop: 27,
    marginBottom: 8,
  },
});