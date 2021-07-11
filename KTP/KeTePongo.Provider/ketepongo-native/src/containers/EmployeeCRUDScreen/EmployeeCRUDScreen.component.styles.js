import { StyleSheet } from 'react-native';
import { COLORS } from 'constants';
import { FONTSIZE } from 'constants';

export default StyleSheet.create({
  role_container: {
    width: '100%',
    height: 166,
    flexDirection: 'row',
    marginBottom: 62
  },
  unselected_container: {
    width: '50%',
    backgroundColor: COLORS.neutral_medium,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  unselected_role_wrapper: {
    color: COLORS.neutral_medium,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  role_unselected: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.tertiary,
    padding: 15,
  },
  role_unselected_description: {
    textAlign: 'center',
    color: COLORS.neutral_strong,
    ...FONTSIZE.medium,
    width: '80%',
  },
  selected_role_wrapper: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '50%',
    backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  role_selected: {
    color: COLORS.neutral_min,
    ...FONTSIZE.tertiary,
    padding: 10,
  },
  role_selected_description: {
    textAlign: 'center',
    color: COLORS.neutral_min,
    ...FONTSIZE.medium,
    width: '80%',
  },
  adjust_border_to_left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  adjust_border_to_right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  btn_wrapper: {

  },
  fillScreen: {
    flex: 1,
  },
  body: {
    paddingLeft: 20,
    paddingRight: 20
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  icon: {
    marginLeft: -5,
    marginRight: 15
  },
  cancel: {
    ...FONTSIZE.secondary_small
  },
  roll_heading_wrapper: {
    marginBottom: 25
  },
  heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main
  },
  secondary_heading: {
    ...FONTSIZE.normal, 
    color: COLORS.neutral_strong
  },
  input_row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: 20,
  },
  icon_wrapper: {
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingBottom: 0,
    marginBottom: 10
  },
  main_info_wrapper: {
    marginTop: 68,
    marginBottom: 52
  },
  header_height: {
    height: 49,
  },
  header_wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  section: {
    flex: 1
  },
  section_heading: {
    width: '80%',
    alignItems: 'center',
  },
  main_heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary_large
  }
});