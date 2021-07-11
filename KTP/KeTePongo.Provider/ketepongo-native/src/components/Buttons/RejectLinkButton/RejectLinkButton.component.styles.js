import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  reject_btn_container: {
    backgroundColor: COLORS.neutral_medium,
    borderRadius: 100,
    height: 32,
    width: 116,
    marginRight: 19
  },
  btn_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10
  },
  reject: {
    color: COLORS.main_80,
    ...FONTSIZE.normal
  },
});