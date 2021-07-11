import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  selected_day_wrapper: {
    backgroundColor: COLORS.main,
    height: 31,
    width: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  selected_day: {
    ...FONTSIZE.secondary_small,
    color: COLORS.secondary,
    paddingTop: 7,
    paddingBottom: 7,
  },
  dates_available : {
    ...FONTSIZE.secondary_small,
    color: COLORS.secondary,
    paddingTop: 7,
    paddingBottom: 7,
  },
  dates_not_available: {
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_medium_strong,
    paddingTop: 7,
    paddingBottom: 7,
  },
});