import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS, SIZE } from 'constants';

export default StyleSheet.create({
  image_wrapper: {
    ...SIZE.square_83,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: COLORS.neutral_light,
    borderWidth: 1,
    marginRight: 15
  },
  product_wrapper: {
    flex: 1,
    height: 105,
    flexDirection: 'row',
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1
  },
  warningBackground: {
    backgroundColor: COLORS.KO_light
  },
  product_right: {
    flex: 1,
    justifyContent: 'space-between',
  },
  product_right_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40
  },
  quantity: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.tertiary
  },
  ref_wrapper: {
    flexDirection: 'row'
  },
  refereces: {
    ...FONTSIZE.normal,
    color: COLORS.neutral_max
  },
  name_wrapper: {
    width: '80%'
  },
  product_name: {
    ...FONTSIZE.tertiary,
    color: COLORS.main
  },
  rejected: {
    ...FONTSIZE.normal,
    color: COLORS.KO_hot
  },
  container: {
    flex: 1
  }
});