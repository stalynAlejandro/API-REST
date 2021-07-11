import { StyleSheet } from 'react-native';
import { HEIGHT, FONTSIZE, COLORS } from 'constants';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center',
    paddingTop: 23,
    paddingBottom: 10
  },
  add_bottom_padding: {
    height: HEIGHT.bottomNavigationHeight.height
  },
  validate_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  look_text: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_strong,
    paddingRight: 4
  },
  look_text_warning: {
    ...FONTSIZE.tertiary,
    color: COLORS.KO_hot,
    paddingRight: 4
  },
  look_text_errored:{
    color: COLORS.red_alert,
  },
  singleOrder_wrapper: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1
  },
  container: {
    flex: 1
  },
  warningBackground: {
    flex: 1,
    backgroundColor: COLORS.KO_light,
  },
  section_date: {
    flex: 7,
    height: 86,
    paddingTop: 5,
    justifyContent: 'space-around'
  },
  section_validate: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 5
  },
});
