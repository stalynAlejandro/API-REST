import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS, SIZE } from 'constants';

export default StyleSheet.create({
  accept_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  accept_icon_size: {
    ...SIZE.square_35
  },
  accept_icon: {
    paddingBottom: 0,
  },
  accept: {
    ...FONTSIZE.extra_small,
    color: COLORS.main,
    paddingTop: 0,
    marginTop: -5
  },
});