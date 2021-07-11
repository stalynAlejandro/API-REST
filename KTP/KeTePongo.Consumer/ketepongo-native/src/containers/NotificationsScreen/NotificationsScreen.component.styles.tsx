import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT, HEIGHT } from 'constants';

export default StyleSheet.create({
  area: {
    height: 650,
    backgroundColor: COLORS.neutral_superlight
  },
  scroll: {
    marginTop: 10
  },
  header: {
    borderBottomWidth: 1,
    borderColor: COLORS.sky_light,
    backgroundColor: COLORS.white,
  },
  textSplash: {
    textAlign: 'center',
    color: COLORS.main_strong,
    ...FONTSIZE.main_large,
    marginTop: 94
  },
  textSpinner: {
    textAlign: 'center',
    color: COLORS.main_strong,
    ...FONTSIZE.main_large,
    marginTop: 50
  },
  noNotifications: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 155,
    backgroundColor: COLORS.main_superlight
  },
  splash: {
    transform: [{ scale: 1.3}],
    marginTop: 40
  },
  spinner: {
    marginTop: 230,
    transform: [{scale: 2}],
  },
  headerMessage: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 2
  },
  errorMessage: {
    color: COLORS.red_alert,
    ...FONTSIZE.small,
    marginLeft: 12,
  },
  successMessage: {
    color: COLORS.green,
    ...FONTSIZE.small,
    marginLeft: 12,
  },
});