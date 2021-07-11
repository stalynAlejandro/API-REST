import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  touchable: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: COLORS.neutral_light,
    
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  googleBtn_wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    
  },
  icon_wrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 40
  },
  text_wrapper: {
marginLeft:-45
  },
  btn_text: {
    color: COLORS.main,
    ...FONTSIZE.medium,
  },
  section: {
    flex: 1
  }
});
