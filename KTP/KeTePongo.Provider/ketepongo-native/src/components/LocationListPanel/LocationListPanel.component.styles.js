import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  container: {
    paddingLeft: 15
  },
  option: {
    height: 37,
    width: 85,
    borderRadius: 20,
    backgroundColor: COLORS.neutral_medium,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  selected: {
    backgroundColor: COLORS.main_secondary
  },

  location_name: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.small,
    textAlign: 'center',
    padding: 5,
    width: 85,
  },
  selected_name: {
    color: COLORS.neutral_min
  }
});
