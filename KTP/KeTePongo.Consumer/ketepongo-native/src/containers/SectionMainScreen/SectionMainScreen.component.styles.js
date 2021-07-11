import { StyleSheet } from 'react-native';
import { HEIGHT, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.neutral_min
  },
  heading: {
    ...FONTSIZE.secondary,
    color: COLORS.black,
    textAlign: 'left',
    marginTop: HEIGHT.topHeaderHeight.height + 24,
    marginBottom: 30,
    paddingLeft:16
  },
  selectionList: {
    flex: 1,
    backgroundColor: COLORS.neutral_superlight,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: HEIGHT.navigationHeight.height + 10
  }
});