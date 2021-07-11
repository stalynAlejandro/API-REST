import { StyleSheet } from 'react-native';
import { HEIGHT, SIZE, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  //  ********** Main
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    paddingTop: HEIGHT.topHeaderHeight.height
  },

  //  ********** UI

  product_container_background: {
    flex: 1,
    backgroundColor: COLORS.neutral_superlight
  },
  product_container: {
    flexDirection: 'row',
    height: 112,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  photo_wrapper: {
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 8
  },
  photo: {
    ...SIZE.square_96
  },
  product_info: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  product_name: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.tertiary,
    height: 50,
  },
  product_provider: {
    paddingTop: 5,
    color: COLORS.neutral_strong,
    ...FONTSIZE.medium
  },
  reactivate_wrapper: {
    alignItems: 'flex-end'
  },
  reactivate: {
    color: COLORS.secondary,
    ...FONTSIZE.tertiary
  }
});