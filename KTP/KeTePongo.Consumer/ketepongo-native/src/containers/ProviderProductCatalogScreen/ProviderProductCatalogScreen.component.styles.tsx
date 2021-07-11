import { StyleSheet } from 'react-native';
import { HEIGHT, FONTSIZE, COLORS } from 'constants';

export default StyleSheet.create({

  body: {
    flex: 1,
    backgroundColor: COLORS.neutral_min,
    paddingTop: 180,
  },
  transition_wrapper: {
    height: 180
  },
  transition_title: {
    ...FONTSIZE.secondary,
    color: COLORS.neutral_super_strong,
    marginBottom: 20
  },
  transition_body: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_super_strong,
    marginBottom: 20
  },
  add_bottom_margin: {
    marginBottom: 30
  },
  empty: {
    height: 100
  },
  btn_wrapper: {
    paddingLeft: 18,
    paddingRight: 18
  },
  secondary_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_small
  },
  secondary_btn: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_small
  },
  main_btn: {
    backgroundColor: COLORS.main,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_heading: {
    marginBottom: 10,
    ...FONTSIZE.main,
    color: COLORS.main,
    textAlign: 'center',
    marginTop: HEIGHT.topHeaderHeight.height + 15
  },
  heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    marginTop: -10,
    textAlign: 'center',
    height: 40
  },
  fillScreen: {
    flex: 1
  },
});