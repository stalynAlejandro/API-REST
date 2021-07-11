import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from 'constants';

export default StyleSheet.create({
//  ********** Main
fillScreen: {
  flex: 1,
  backgroundColor: COLORS.neutral_min
},
body: {
  flex: 1,
  backgroundColor: COLORS.neutral_min
},
dark_background: {
  backgroundColor: COLORS.neutral_superlight
},
//  ********** UI

  color_dark: {
    color: COLORS.neutral_strong
  },
  detail_wrapper: {
    flex: 1
  },
  detail: {
    color: COLORS.neutral_super_strong,
    ...FONTSIZE.normal
  },
  product_card: {
    height: 86,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1
  },
  image_wrapper: {
    width: 69,
    height: '100%',
    justifyContent: 'center',
    marginRight: 10
  },
  product_image: {
    ...SIZE.square_69
  },
  product_detail: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
  },
  productName: {
    lineHeight: 19,
    height: 40,
    color: COLORS.main,
    ...FONTSIZE.main,
  },
  product_detail_bottom: {
    flexDirection: 'row',
  },
  heading_wrapper: {
    height: 83,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 24,
  },
  tab_heading: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main
  },
  tradeName_heading: {
    ...FONTSIZE.medium,
    color: COLORS.main
  }
});