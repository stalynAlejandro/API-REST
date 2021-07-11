import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  singleOrder_wrapper: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1
  },
  section_name: {
    flex: 9,
    justifyContent: 'space-between'
  },
  order_client: {
    ...FONTSIZE.tertiary,
    color: COLORS.main,
    paddingTop: 10
  },
  order_number: {
    ...FONTSIZE.extra_small,
    color: COLORS.neutral_super_strong,
    marginBottom: 9
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