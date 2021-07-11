import { StyleSheet } from 'react-native';
import { FONTSIZE , COLORS, HEIGHT } from 'constants';

export default StyleSheet.create({
  //  ********** Main
  fillScreen: {
    flex: 1
  },
  body: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: HEIGHT.topHeaderHeight.height,
    paddingTop: 24
  },
  employee_heading_wrapper: {
    marginBottom: 10
  },

  //  ********** UI

  employee_wrapper: {
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1
  },
  employee_top_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name_wrapper: {
    flex: 2
  },
  phone_wrapper: {
    flex: 1
  },
  main_heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary
  },
  detail: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.secondary_small,
    marginBottom: 25
  },
  header_container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  heading_wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 35,
  }
});