import { StyleSheet } from 'react-native';
import { HEIGHT, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center',
    marginTop: HEIGHT.topHeaderHeight.height + 30,
    marginBottom: 30,
  },
  selectionList: {
    flex: 1,
    backgroundColor: COLORS.neutral_superlight,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: HEIGHT.navigationHeight.height + 10
  }
});