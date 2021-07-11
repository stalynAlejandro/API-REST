import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, LAYOUT, TYPOGRAPHY, SIZE } from 'constants';

export default StyleSheet.create({
  password_btn_wrapper: {
    marginTop: 50
  },
  password_wrapper: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingBottom: 0,
    marginBottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input_password: {
    ...TYPOGRAPHY.openSans_semi_bold,
    ...FONTSIZE.medium,
    color: COLORS.main,
    paddingBottom: 0,
    paddingLeft: 0,
    width: '90%'
  },
  icon_size: {
    ...SIZE.square_20,
    borderColor: 'red',
    borderWidth: 1
  },
  input_code_container: {
    paddingLeft: 40,
    paddingRight: 40,
    height: 120,
    alignItems: 'center'
  },
  input_code_line: {
    borderBottomColor: COLORS.main,
    color: COLORS.main
  },
  warningText_wrapper: {
    marginBottom: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  container: {
    flex: 1,
    backgroundColor: COLORS.main_background,
    paddingTop: 15,
    paddingBottom: 41
  },
  body: {
    flex: 1,
    marginTop: 49,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 35,
  },
  heading_confirmation_code: {
    color: COLORS.main,
    ...FONTSIZE.normal,
    marginBottom: 80
  },
  country_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    marginLeft: 16,
    marginRight: 16,
    borderBottomColor: COLORS.neutral_light_medium,
    borderBottomWidth: 1
  },
  flag: {
    width: 17,
    height: 12,
    marginRight: 18,
  },
  country: {
    color: COLORS.neutral_light_medium,
    ...FONTSIZE.secondary_small
  },
  selection_country: {
    color: COLORS.main,
    ...FONTSIZE.tertiary,
  },
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width: '90%',
    marginTop: 15,
  },
  searchInput: {
    width: '90%'
  },
  modal: {
    left: (LAYOUT.WINDOW.width - 324) / 2,
    top: 166,
    width: 324,
    height: 308,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    paddingTop: 15,
  },
  modal_top_wrapper: {
    borderBottomColor: COLORS.neutral_light_medium,
    borderBottomWidth: 1,
    paddingLeft: 18
  },
  warningText_top: {
    marginBottom: 10,
  },
  helper: {
    ...FONTSIZE.medium,
    color: COLORS.neutral_strong
  },
  disabled_btn_text: {
    color: COLORS.neutral_medium_strong,
    ...FONTSIZE.secondary_small
  },
  disabled_btn: {
    borderColor: COLORS.neutral_medium_strong,
    backgroundColor: COLORS.neutral_min,
    marginBottom: 28
  },
  active_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_small
  },
  active_btn: {
    backgroundColor: COLORS.main,
    marginBottom: 28
  },
  input_container: {
    width: '100%',
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    marginBottom: 57,
  },
  input_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  country_selected_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginRight: 10
  },
  country_selected: {
    ...FONTSIZE.tertiary,
    color: COLORS.main,
    marginRight: 10
  },
  input: {
    paddingBottom: 0,
    paddingLeft: 0,
    width: '90%',
  },
  heading: {
    ...FONTSIZE.tertiary ,
    color: COLORS.neutral_max,
    marginBottom: 30
  },
  header_height: {
    height: 59
  }
});