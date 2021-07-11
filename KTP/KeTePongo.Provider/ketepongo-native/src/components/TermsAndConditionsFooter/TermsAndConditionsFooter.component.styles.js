import { StyleSheet } from 'react-native';
import { TYPOGRAPHY, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  footer_teext: {
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.small,
    color: COLORS.main,
    lineHeight: 14
  },
  terms_text: {
    ...TYPOGRAPHY.openSans_bold,
    color: COLORS.secondary,
  }
});
