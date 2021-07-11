import { StyleSheet } from 'react-native';
import { HEIGHT, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  fillScreen: {
    flex: 1,
  },
  heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center',
    marginTop: HEIGHT.topHeaderHeight.height + 30,
    marginBottom: 30,
  },
});