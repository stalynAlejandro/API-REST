import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS } from 'constants';

export default StyleSheet.create({
  container: {
    flex: 9,
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12,
  },
  order_number: {
    ...FONTSIZE.tertiary,
    color: COLORS.main
  },
  validate_heading: {
    ...FONTSIZE.tertiary,
    color: COLORS.KO_hot,
  },
  validate_provider: {
    ...FONTSIZE.normal,
    color: COLORS.KO_hot
  },
});