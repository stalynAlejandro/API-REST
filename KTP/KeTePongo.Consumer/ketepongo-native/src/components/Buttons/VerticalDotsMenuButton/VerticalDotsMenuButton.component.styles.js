import { StyleSheet } from 'react-native';
import { LAYOUT, COLORS, FONTSIZE, SIZE } from 'constants';

export default StyleSheet.create({
  modal: {
    ...LAYOUT.defaultAlert
  },
  alert_heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },
  alert_heading_question: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    marginBottom: 15
  },
  alert_btns_wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  white_btn: {
    height: 40,
    width: 123,
    marginRight: 5,
    ...FONTSIZE.secondary_large,
    color: COLORS.main,
    backgroundColor: COLORS.neutral_dark
  },
  blue_btn: {
    height: 40,
    width: 123,
    marginLeft: 5,
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
    backgroundColor: COLORS.main
  },
  btn_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  accept_icon: {
    paddingBottom: 0,
  },
  vertical_dots: {
    ...SIZE.square_20
  },
  menu_container: {
    left: LAYOUT.WINDOW.width - 267,
    top: 0,
    width: 267,
    height: 199,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
  },
  menu_close_wrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 15,
  },
  menu_section_dark: {
    flex: 1,
    backgroundColor: COLORS.neutral_light,
    paddingLeft: 26,
    justifyContent: 'center'
  },
  menu_section: {
    flex: 1,
    paddingLeft: 26,
    justifyContent: 'center'
  },
  menu_heading: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_max
  },
});