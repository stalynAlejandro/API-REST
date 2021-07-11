import { StyleSheet } from 'react-native';
import { COLORS } from 'constants';

export default StyleSheet.create({
  btns_wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  white_btn: {
    height: 40,
    width: 123,
    marginRight: 5,
    backgroundColor: COLORS.neutral_dark,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_left: {
    color: COLORS.main_80
  },
  blue_btn: {
    height: 40,
    width: 123,
    marginLeft: 5,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_right: {
    color: COLORS.neutral_min
  }
});