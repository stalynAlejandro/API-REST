import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  quantity_container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  trash_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  minus_button: {
    backgroundColor: COLORS.neutral_light,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add_button: {
    height: 32,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pedir: {
    ...FONTSIZE.medium,
    ...TYPOGRAPHY.openSans_semi_bold,
    color: COLORS.neutral_min,
  },
  quantity: {
    ...FONTSIZE.crazy_max,
    color: COLORS.neutral_super_strong,
    paddingLeft: 10,
    paddingRight: 10
  }
});