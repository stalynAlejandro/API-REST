import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS, HEIGHT, LAYOUT, SIZE } from 'constants';

export default StyleSheet.create({
  // ********** Main
  btn_container: {
    position: 'absolute',
    zIndex: 100,
    top: LAYOUT.WINDOW.height - HEIGHT.bottomNavigationHeight.height - 80,
    left: (LAYOUT.WINDOW.width - 324) / 2
  },
  add_provider_btn: {
    backgroundColor: COLORS.ok,
    justifyContent: 'center',
    alignItems: 'center',
    width: 324
  },
  btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large
  },
  form_container: {
    flex: 1,
    marginBottom: HEIGHT.bottomNavigationHeight.height,
  },
  fillScreen: {
    flex: 1,
  },
  ref_input: {
    paddingBottom: 0,
    paddingLeft: 0
  },
  body: {
    flex: 1,
    marginTop: HEIGHT.topHeaderHeight.height,
    marginBottom: HEIGHT.bottomNavigationHeight.height + 30,
    paddingTop: 25,
  },
  input_wrapper: {
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input_section: {
    height: 80
  },
  red_border: {
    borderBottomColor: COLORS.KO
  },

  // ********** UI

  delete_wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  trash_icon: {
    ...SIZE.square_19,
    marginRight: 20
  },
  eliminate_text: {
    color: COLORS.neutral_medium_strong,
    ...FONTSIZE.secondary_small
  },
  error_btn: {
    color: COLORS.KO,
    ...FONTSIZE.extra_small,
    textAlign: 'center'
  },
  error: {
    color: COLORS.KO,
    ...FONTSIZE.extra_small
  },
  linked_wrapper: {
    flexDirection: 'row',
    marginBottom: 20
  },
  provider_linked: {
    color: COLORS.main,
    ...FONTSIZE.medium,
    paddingRight: 10
  },
  input: {
    width: '100%',
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  input_border: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    marginBottom: 1
  },
  detail_wrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.main,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  info_wrapper: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
  },
  info: {
    marginTop: 10,
    color: COLORS.main,
    ...FONTSIZE.tertiary
  },
  input_heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
  },
  heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    marginBottom: 28
  },
  alert_container: {
    ...LAYOUT.defaultAlert,
  },
  alert_text: {
    textAlign: 'center',
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
  },
  alert_btns_wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  secondary_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main_80,
  },
  main_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
  },
  white_btn: {
    height: 40,
    width: 123,
    marginRight: 5,
    backgroundColor: COLORS.neutral_dark,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blue_btn: {
    height: 40,
    width: 123,
    marginLeft: 5,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
});