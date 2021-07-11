import { StyleSheet } from 'react-native';
import { HEIGHT } from 'constants';

export default StyleSheet.create({
// ********** Main
  fillScreen: {
    flex: 1
  },
  body: {
    marginTop: HEIGHT.topHeaderHeight.height,
    flex: 1
  },
// ********** UI

  header_container: {
    flex: 1,
    justifyContent: "space-between",
  },
  heading_wrapper: {
    justifyContent: 'flex-end'
  }
});