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
  provider_name: {
    ...FONTSIZE.normal,
    color: COLORS.main,
  },
  delivery_heading: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_medium_strong,
  },
  deliver_date: {
    ...FONTSIZE.normal,
    color: COLORS.neutral_strong,
  }
});