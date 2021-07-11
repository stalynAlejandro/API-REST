import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT } from 'constants';

export default StyleSheet.create({
  delete_alert_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  delete_alert_wrapper: {
    ...LAYOUT.defaultAlert,
  },
});
