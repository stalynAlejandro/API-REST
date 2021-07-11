import { StyleSheet, Platform } from 'react-native';
import { SIZE, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  warning_wrapper: {
    alignItems: 'center',
    paddingRight: 5
  },  
  icon_wrapper: {
    ...SIZE.square_34,
    borderRadius: 100,
    backgroundColor: COLORS.KO_hot,
    paddingTop: 6,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  look_validate: {
    color: COLORS.KO_hot,
    ...FONTSIZE.small
  },
  warning_size: {
    ...SIZE.square_18
  }
});