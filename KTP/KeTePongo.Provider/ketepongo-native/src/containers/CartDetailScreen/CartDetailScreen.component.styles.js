import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZE, FONTSIZE, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ************ Main
  btn_wrapper: {
    position: 'absolute',
    width: '100%',
    marginTop: LAYOUT.WINDOW.height - 100,
    right: 20,
  },
  btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min
  },
  btn: {
    backgroundColor: COLORS.main
  },
  provider_close_section: {
    width: '100%',
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.neutral_strong,
    borderBottomWidth: 1
  },
  provider_open_section: {
    width: '100%',
    height: 203,
    borderBottomColor: COLORS.neutral_strong,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  modal: {
    ...LAYOUT.defaultAlert
  },
  alert_heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    textAlign: 'center'
  },
  alert_heading_question: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    marginBottom: 15,
    textAlign: 'center'
  },
  alert_btns_wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    paddingTop: 61,
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
    marginBottom: 110,
  },
  // ************ UI
  provider_heading_calendar_wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20
  },
  provider_with_calendar_heading: {
    flex: 1
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
  secondary_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main
  },
  main_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min
  },
  delivery_heading: {
    color: COLORS.secondary,
    ...FONTSIZE.medium
  },
  date_wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  date: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_strong,
    marginRight: 10
  },
  comment: {
    color: COLORS.main,
    ...FONTSIZE.normal,
    marginRight: 10
  },
  row_align: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  empty_comment: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.normal,
    marginRight: 10
  },
  provider_wrapper: {
    paddingTop: 20,
    paddingBottom: 20
  },
  provider: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
  },
  heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary_large,
    paddingTop: 34,
    paddingBottom: 34,
    borderBottomColor: COLORS.neutral_strong,
    borderBottomWidth: 1
  },
  backButton: {
    backgroundColor: COLORS.neutral_min,
    borderColor: COLORS.neutral_light,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 4,
      },
    })
  },
  backButtonSize: {
    ...SIZE.square_20
  },
  header_height: {
    height: 61
  }
});