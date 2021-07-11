import { StyleSheet } from 'react-native';
import { COLORS, SIZE } from 'constants';

export default StyleSheet.create({
  container: {
    height: 97,
  },
  text_input: {
    color: COLORS.main,
    textAlignVertical: 'top',
    paddingBottom: 0,
    marginBottom: 8
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 0
  },
  add_marginLeft: {
    marginRight: 22,
  },
  btn_area: {
    ...SIZE.square_30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    ...SIZE.square_20
  }
});