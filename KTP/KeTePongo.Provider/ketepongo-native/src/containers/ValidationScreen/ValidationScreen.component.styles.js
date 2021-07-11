import { StyleSheet, Platform } from 'react-native';
import { HEIGHT, COLORS, FONTSIZE, SIZE, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********** Main
  delete_background: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  highlight: {
    backgroundColor: COLORS.sunny
  },
  product_background: {
    backgroundColor: COLORS.neutral_min,
  },
  blurry: {
    flex: 1,
    zIndex: 100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.shadow,
  },
  fillScreen: {
    flex: 1
  },
  adjustBody: {
    marginTop: HEIGHT.topHeaderHeight.height,
    flex: 1,
    paddingBottom: HEIGHT.bottomNavigationHeight.height
  },
  status_order_wrapper: {
    height: 129,
  },

  // ********** UI

  edit_product_container: {
    zIndex: 200,
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    height: 163,
    width: '100%',
  },
  product_detail_wrapper: {
    flexDirection: 'row',
    flex: 1
  },
  edit_image_wrapper: {
    ...SIZE.square_89,
    backgroundColor: COLORS.neutral_medium,
    borderColor: COLORS.neutral_medium,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14
  },
  image: {
    ...SIZE.square_89,
  },
  product_right: {
    flex: 1
  },
  detail_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 5
  },
  reference: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.normal
  },
  format: {
    ...FONTSIZE.normal,
    color: COLORS.neutral_strong,
  },
  name: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_strong,
    height: 40,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  quantity_wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantity: {
    color: COLORS.main,
    ...FONTSIZE.medium
  },
  textInput: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    marginTop: 0,
    paddingBottom: -10,
    textAlign: 'center',
    height: 30,
    width: 58
  },
  btn_wrapper: {
    height: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  cancel: {
    ...FONTSIZE.small,
    color: COLORS.neutral_strong
  },
  cancelBtn: {
    backgroundColor: COLORS.neutral_medium,
    width: 89,
    height: 25,
    borderRadius: 3
  },
  apply: {
    ...FONTSIZE.small,
    color: COLORS.neutral_min
  },
  applyBtn: {
    backgroundColor: COLORS.main,
    flex: 1,
    height: 25,
    borderRadius: 3,
    marginLeft: 14
  },
  large_pencil: {
    ...SIZE.square_20
  },
  padding_right: {
    paddingRight: 52
  },
  small_pencil: {
    ...SIZE.square_14,
  },
  main_pencil: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  product: {
    zIndex: 100,
    backgroundColor: COLORS.neutral_min,
    flexDirection: 'row',
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1,
    height: 114,
    paddingTop: 13,
    paddingBottom: 13,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  product_detail: {
    flex: 1,
    justifyContent: 'space-between'
  },
  row_direction: {
    flexDirection: 'row',
    width: '100%',
  },
  ref_section: {
    width: '50%',
    flexDirection: 'row'
  },
  ref_value: {
    color: COLORS.neutral_max,
    ...FONTSIZE.normal
  },
  edit_section_wrapper: {
    width: '50%',
    alignItems: 'flex-end',
  },
  key_ref: {
    color: COLORS.neutral_max,
    ...FONTSIZE.medium
  },

  pending_product_background: {
    backgroundColor: COLORS.KO_light,
  },
  pending_product: {
    flexDirection: 'row',
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1,
    height: 114,
    paddingTop: 13,
    paddingBottom: 13,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  image_wrapper: {
    ...SIZE.square_89,
    backgroundColor: COLORS.neutral_medium,
    borderColor: COLORS.neutral_medium,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7
  },
  product_name: {
    ...FONTSIZE.tertiary,
    color: COLORS.main,
    paddingTop: 5,
    height: 50,
    width: '80%'
  },
  pending_icon_wrapper: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.secondary,
    ...SIZE.square_30,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  popUp_wrapper: {
    position: 'absolute',
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    ...HEIGHT.filterHeight,
    width: '100%',
    backgroundColor: COLORS.neutral_min,
  },
  popUp_icon: {
    flex: 1,
    paddingLeft: 20
  },
  xIcon_wrapper: {
    ...SIZE.square_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: COLORS.neutral_min,
    borderColor: 'transparent',
    borderWidth: 0.1,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  popUp_heading: {
    flex: 5,
    alignItems: 'center'
  },
  popUp_text: {
    color: COLORS.main,
    ...FONTSIZE.tertiary
  },
  order_number: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main
  },
  adjustMargins: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  finished_wrapper: {
    flexDirection: 'row'
  },
  order_heading: {
    flex: 1,
    color: COLORS.neutral_medium_strong,
    ...FONTSIZE.secondary_small
  },
  order_heading_two_wrapper: {
    flex: 1
  },
  order_heading_two: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.secondary_large
  },
  date: {
    ...FONTSIZE.medium,
    color: COLORS.neutral_strong
  },
  add_paddingTop: {
    paddingTop: 5
  },
  disabledBtn: {
    backgroundColor: COLORS.neutral_medium,
    borderRadius: 5,
    height: 36,
    paddingBottom: 0
  },
  validate_btn: {
    borderRadius: 5,
    height: 36,
    marginBottom: 20
  },
  disabledText: {
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_medium_strong
  },
  btnText: {
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_min
  },
  warning_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 10,
    paddingBottom: 10
  },
  icon: {
    marginRight: 5
  },
  warning: {
    ...FONTSIZE.small,
    color: COLORS.KO_hot
  },
  basket_btn_wrapper: {
    position: 'absolute',
    zIndex: 100,
    top: LAYOUT.WINDOW.height - HEIGHT.bottomNavigationHeight.height - 85,
    left: LAYOUT.WINDOW.width - 65,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  pencil_icon: {
    marginRight: 52
  },
  edit_header_container: {
    ...HEIGHT.topHeaderHeight,
    justifyContent: 'space-between',
    paddingTop: 19,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20
  },
  edit_header_heading: {
    textAlign: 'center',
    ...FONTSIZE.tertiary,
    color: COLORS.secondary
  },
  action_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cancel_btn: {
    ...SIZE.square_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.shadow_10,
    borderWidth: 1,
    borderRadius: 30
  },
  numberOfEdit: {
    marginLeft: 15,
    color: COLORS.secondary,
    ...FONTSIZE.main_large
  },
  flex_direction_row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header_container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header_title_wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 35,
  },
  headerHeight: {
    ...HEIGHT.topHeaderHeight
  }
});