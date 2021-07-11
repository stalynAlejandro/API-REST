import { StyleSheet, Platform } from 'react-native';
import { SIZE, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  btn_wrapper: {
    backgroundColor: COLORS.main,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    shadowColor: COLORS.neutral_max,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  btn_wrapper_secondary:{
    backgroundColor: COLORS.main_secondary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plus_icon: {
    ...SIZE.square_12
  },
  heading_wrapper: {
    width: '100%',
  },
  heading: {
    ...FONTSIZE.tertiary,
    lineHeight: 18,
    color: COLORS.neutral_min,
    paddingLeft: 10,
    paddingRight: 15,
    textAlign: 'center'
  }
});
