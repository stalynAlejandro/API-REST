import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS } from 'constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon_wrapper: {
    paddingRight: 10
  },
    date: {
    ...FONTSIZE.normal,
    color: COLORS.neutral_super_strong
  },
});