import { StyleSheet } from 'react-native';
import { COLORS, SIZE, FONTSIZE } from 'constants';

export default StyleSheet.create({
  link_btn_container: {
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
    flex: 1,
    height: 32,
  },
  btn_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10
  },
  link_icon_size: {
    ...SIZE.square_25
  },
  link: {
    color: COLORS.neutral_min,
    ...FONTSIZE.normal
  },
});