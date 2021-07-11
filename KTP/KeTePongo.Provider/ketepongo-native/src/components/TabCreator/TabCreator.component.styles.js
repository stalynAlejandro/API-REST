import { StyleSheet, Platform } from 'react-native';
import { SIZE, COLORS, LAYOUT, FONTSIZE, HEIGHT } from 'constants';

export default StyleSheet.create({
  label_container: {
    flexDirection: 'row',
    width: LAYOUT.WINDOW.width / 2,
    justifyContent: 'center'
  },
  label_dot: {
    ...SIZE.square_5,
    borderRadius: 5,
    backgroundColor: COLORS.KO_hot
  },
  container: {
    flex: 1,
  },
  header: {
    ...HEIGHT.filterHeight,
  },
  tab_container: {
    flex: 1,
  },
  tab_header: {
    width: '100%',
    ...HEIGHT.tabHeight
  },
  initialLayout: { 
    width: LAYOUT.WINDOW.width 
  },
  tab_label: {
    ...FONTSIZE.secondary_small,
    lineHeight: 25,
    textAlign: 'center',
  },
  indicatorStyle: {
    backgroundColor: COLORS.main,
    borderBottomWidth: 1,
  },
  tab_style: {
    backgroundColor: COLORS.neutral_min,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      }, 
    }),
    height: 42
  },
});