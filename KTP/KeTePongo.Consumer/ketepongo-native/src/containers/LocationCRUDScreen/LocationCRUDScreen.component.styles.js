import { StyleSheet } from 'react-native';
import { 
  FONTSIZE, 
  COLORS, 
  TYPOGRAPHY, 
  HEIGHT,
  LAYOUT
} from 'constants';

export default StyleSheet.create({
  //  ********** Main
  fillScreen: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingTop: HEIGHT.topHeaderHeight.height + 10,
    paddingLeft: 23,
    paddingRight: 23,
    paddingBottom: HEIGHT.bottomNavigationHeight.height,
  },

  //  ********** Ui

  modal: {
    ...LAYOUT.defaultAlert
  },
  warningText_top: {
    marginBottom: 10
  },
  warningText: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    textAlign: 'center'
  },
  fillSpace: {
    flex: 1,
  },
  yes_no_wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondary_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main_80,
  },
  white_btn: {
    backgroundColor: COLORS.neutral_medium,
    width: 123,
    height: 40,
    marginRight: 10,
  },
  main_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
  },
  blue_btn: {
    backgroundColor: COLORS.main,
    width: 123,
    height: 40
  },
  btns_wrapper: {
    marginBottom: 10,
  },
  cancel_btn: {
    backgroundColor: COLORS.main,
    color: COLORS.neutral_min
  },
  eliminate_btn_text: {
    color: COLORS.main_85,
    ...FONTSIZE.secondary_large
  },
  delete_btn: {
    backgroundColor: COLORS.neutral_light,
    marginBottom: 10
  },
  save_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large
  },
  save_btn: {
    backgroundColor: COLORS.ok,
  },
  save_btn_text_disable: {
    color: COLORS.neutral_medium_strong,
    ...FONTSIZE.secondary_large
  },
  disabled_btn: {
    backgroundColor: COLORS.neutral_medium,
  },
  input: {
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.tertiary,
    height: 40,
    paddingBottom: 0,
    width: '100%',
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1
  },
  location_heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main
  },
});