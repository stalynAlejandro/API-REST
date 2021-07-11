import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT,HEIGHT } from 'constants';

export default StyleSheet.create({
  // ********** Main
  fillScreen: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: HEIGHT.topHeaderHeight.height,
      },
      ios: {
        marginTop: HEIGHT.topHeaderHeight.height + 40
      }
    })
  },
  flatListWithProducts: {
    flex: 1,
    zIndex: 0
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width: '100%',
    height: 60,
    paddingRight: 16,
  },
  underLine: {
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1
  },
  name: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main,
  },
  name_1: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    paddingRight:15,
  },
  name_1_active: {
    ...FONTSIZE.secondary_small,
    color: COLORS.secondary_strong,
    paddingRight:15,
  },
  pencil_wrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  section_container:{
    backgroundColor:COLORS.neutral_min,
    paddingLeft:16
  },
  section_container_active:{
    paddingLeft:16,
    borderLeftColor: COLORS.secondary_strong,
    borderLeftWidth: 4,
    backgroundColor: COLORS.secondary_light,
    borderBottomColor: COLORS.neutral_medium,
    borderTopColor: COLORS.neutral_medium,
    borderBottomWidth: 1.5,
  }
});
