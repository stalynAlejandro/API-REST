import { StyleSheet, Platform } from 'react-native';
import { SIZE, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  touchable: {
    backgroundColor: COLORS.neutral_light,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 6,
    marginTop:2.5,
    paddingBottom: 6,
    
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter_icon: {
    ...SIZE.square_15
  },
  heading: {
    ...FONTSIZE.tertiary,
    color: COLORS.main,
    paddingLeft: 10,
    paddingRight: 15,
    lineHeight: 18
  }
});
