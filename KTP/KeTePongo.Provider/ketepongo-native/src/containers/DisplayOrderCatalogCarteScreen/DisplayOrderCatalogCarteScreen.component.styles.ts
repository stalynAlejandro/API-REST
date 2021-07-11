import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT, HEIGHT } from 'constants';

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
  no_products_for_filters: {
    ...FONTSIZE.secondary_small,
    textAlign: "center",
    marginTop: 50
  },
  no_products_hint:{
    ...FONTSIZE.secondary_small,
    lineHeight: 19,
    color: COLORS.black,
    marginVertical: 24,
    textAlign: "center"
  },
  section:{
    backgroundColor: COLORS.neutral_min
  }
});
