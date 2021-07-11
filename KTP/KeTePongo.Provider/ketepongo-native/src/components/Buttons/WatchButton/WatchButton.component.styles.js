import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from 'constants';

export default StyleSheet.create({
  validate_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  look_text: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_strong,
    paddingRight: 4
  },
  arrow_size: {
    ...SIZE.square_9
  }
});