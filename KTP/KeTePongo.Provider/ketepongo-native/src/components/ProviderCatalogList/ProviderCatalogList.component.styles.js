import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from 'constants';

export default StyleSheet.create({
  product: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: COLORS.neutral_light,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  image_wrapper: {
    ...SIZE.square_115,
    marginRight: 25
  },
  description_wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    ...FONTSIZE.medium,
    color: COLORS.main,
    height: 60,
    marginLeft: 5
  },
  btn: {
    height: 32
  }
});