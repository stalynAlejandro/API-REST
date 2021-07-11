import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT, HEIGHT } from 'constants';

export default StyleSheet.create({
  title: {
    textAlign: 'center',
    ...FONTSIZE.super_main,
    marginTop: 20,
    marginBottom: 20,
  },
  scroll: {
    height: 550
  },
  body: {
    backgroundColor: COLORS.main_superlight
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
    marginTop: 58
  },
  splash: {
    transform: [{ scale: 1.3}]
  },
  spinner: {
    marginTop: 160,
    transform: [{scale: 2}],
  },
  headerMessage: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  errorMessage: {
    color: COLORS.red_alert,
    ...FONTSIZE.small,
    marginLeft: 12
  },
  successMessage: {
    color: COLORS.green,
    ...FONTSIZE.small,
    marginLeft: 12
  },
});