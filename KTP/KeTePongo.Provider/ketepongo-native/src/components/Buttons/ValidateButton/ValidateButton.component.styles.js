import { StyleSheet } from 'react-native';
import { SIZE, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  validate_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  validate: {
    ...FONTSIZE.tertiary,
    color: COLORS.main,
    paddingRight: 4
  },
  arrow_size: {
    ...SIZE.square_9
  }
});