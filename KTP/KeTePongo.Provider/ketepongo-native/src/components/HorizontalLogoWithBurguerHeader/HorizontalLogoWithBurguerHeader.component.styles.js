import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT, HEIGHT } from 'constants';

export default StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 20,
    backgroundColor: COLORS.main_superlight,
    height: 60,
    width: '100%',
  },
  shadowLine: {
    borderRadius: 5,
    height: 3,
    backgroundColor: COLORS.sky_light,
    paddingTop: 1,
  }
});