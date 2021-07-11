import { StyleSheet } from 'react-native';
import { FONTSIZE, SIZE } from 'constants';

export default StyleSheet.create({
  constrain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon_size: {
    ...SIZE.square_20
  },
  name: {
    ...FONTSIZE.medium
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  constrain_wrapper: {
    flexDirection: 'row'
  },
});