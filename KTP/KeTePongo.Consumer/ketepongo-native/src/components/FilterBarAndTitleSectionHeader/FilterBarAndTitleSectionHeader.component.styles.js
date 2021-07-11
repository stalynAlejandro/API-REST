import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZE } from 'constants';

export default StyleSheet.create({
  backButton: {
    backgroundColor: COLORS.neutral_min,
    borderColor: COLORS.neutral_light,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 4,
      },
    })
  },
  back_arrow_size: {
    ...SIZE.square_20
  },
  bottom_header: {
    paddingTop: 5
  },
});