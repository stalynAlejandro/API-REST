import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZE } from 'constants';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fillScreen: {
    flex: 1
  },
  back_arrow_wrapper:{
    paddingLeft: 15
  },
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
  backButtonSize: {
    ...SIZE.square_20
  },
});