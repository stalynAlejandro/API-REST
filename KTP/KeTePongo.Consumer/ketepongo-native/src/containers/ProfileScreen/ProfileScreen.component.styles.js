import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY, SIZE, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********* Main
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral_min,
  },
  body: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 79 
  },
  btn_wrapper: {
    marginTop: 20
  },
  phone_change_alert_wrapper: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 166,
    width: 294,
    height: 201,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  alert_color_size: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center',
    marginBottom: 30
  },
  verification_container: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 166,
    width: 294,
    height: 219,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  verification_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  // ********* UI
  verification_middle: {
    marginTop: 25,
    marginBottom: 25,
    textAlign: 'center',
  },
  ok_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_small
  },
  ok_button: {
    backgroundColor: COLORS.main,
    height: 40,
    width: 132,
    ...TYPOGRAPHY.openSans_bold
  },
  lock_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    marginLeft: -5
  },
  change_password_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20
  },
  icon: {
    marginRight: 14,
  },
  icon_size: {
    ...SIZE.square_30
  },
  change_password: {
    color: COLORS.secondary,
    ...FONTSIZE.secondary_small
  },
  close_account: {
    color: COLORS.KO,
    ...FONTSIZE.secondary_small
  },
  user_detail_container: {
    marginBottom: 20
  },
  userDetail: {
    width: '100%',
    color:COLORS.neutral_super_strong,
    ...FONTSIZE.tertiary,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    alignItems: 'flex-start'
  },
  direction_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  long_input_helper_wrapper: {
    marginBottom: 0
  },
  long_input_wrapper: {
    marginBottom: 20,
  },
  helper: {
    ...FONTSIZE.extra_small,
    paddingTop: 5
  },
  heading: {
    ...FONTSIZE.main_large,
    color: COLORS.main,
    marginBottom: 10
  },
  employee_heading: {
    color: COLORS.neutral_light_medium,
    ...FONTSIZE.secondary_small,
    height: 60,
  },
  short_input_wrapper: {
    width: '48%',
    marginBottom: 10
  },
  input: {
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.medium,
    color: COLORS.main,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
  },
  double_long_input_wrapper: {
    height: 70,
    marginBottom: 10
  },
  input_heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    marginBottom:26,
    marginTop:30
  },
  double_long_input: {
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.medium,
    color: COLORS.main,
    height: 50,
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 0,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
  },
  header_height: {
    height: 59
  }
});