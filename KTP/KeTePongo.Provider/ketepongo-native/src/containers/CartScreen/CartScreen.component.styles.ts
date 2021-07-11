import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZE, FONTSIZE, TYPOGRAPHY, LAYOUT } from 'constants';

const CartStyles = StyleSheet.create({
  modal: {
    ...LAYOUT.defaultAlert
  },
  alert_heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },
  alert_heading_question: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    marginBottom: 15
  },
  container: {
    flex: 1,
  },
  empty_space: {
    height: 138
  },
  btn_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  secondary_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main_80,
  },
  main_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
  },
  white_btn: {
    height: 40,
    width: 123,
    marginRight: 5,
    backgroundColor: COLORS.neutral_dark,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blue_btn: {
    height: 40,
    width: 123,
    marginLeft: 5,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cart_btn_wrapper: {
    position: 'absolute',
    zIndex: 100,
    marginTop: LAYOUT.WINDOW.height - 220,
    width: LAYOUT.WINDOW.width - 40,
    height: 138,
    flex: 1,
    borderTopColor: COLORS.main,
    borderTopWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 28
  },
  return_text: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.secondary_small,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  confirm_order_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
  },
  continue_btn: {
    backgroundColor: COLORS.ok,
    width: '100%',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  continue_btn_with_Spinner:{
    backgroundColor: COLORS.ok,
    width: '100%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  summary: {
    height: 119,
    justifyContent: 'space-between',
    paddingTop: 25,
    marginBottom: 19,
    paddingBottom: 15,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1
  },
  body: {
    flex: 1,
    marginTop: 61,
    paddingLeft: 20,
    paddingRight: 20
  },
  header_height: {
    height: 61
  },
  main_heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main
  },
  provider_heading: {
    height: 64,
    paddingTop: 14,
    paddingBottom: 14,
  },
  justify_center: {
    justifyContent: 'center'
  },
  arrow_icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  provider_list: {
    borderBottomColor: COLORS.neutral_strong,
    borderBottomWidth: 1
  },
  product_wrapper: {
    height: 105,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: 11,
    paddingBottom: 11,
  },
  product_image: {
    ...SIZE.square_83
  },
  product_infor_wrapper: {
    flex: 1,
    marginLeft: 98,
    justifyContent: 'space-between',
  },
  flew_row_space_between: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  product_locations_wrapper: {
    flexDirection: 'row',
    width: '100%'
  },
  product_location: {
    color: COLORS.neutral_strong,
    ...FONTSIZE.small
  },
  product_name: {
    width: '80%',
    height: 35,
    lineHeight: 17,
    ...FONTSIZE.tertiary,
    color: COLORS.main,
  },
  product_quantity: {
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_strong
  },
  align_center: {
    alignItems: 'center'
  },
  comment_icon: {
    ...SIZE.square_14
  },
  btn_container: {
    width: '35%',
  },
  alert_btns_wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  background_light_grey: {
    backgroundColor: COLORS.neutral_medium_strong
  },
  minus_icon: {
    ...SIZE.square_16
  },
  plus_icon: {
    ...SIZE.square_12
  },
  product_container: {
    height: 211,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1
  },
  radio_white: {
    backgroundColor: COLORS.neutral_min
  },
  radio_selected: {
    backgroundColor: COLORS.main
  },
  radio_option_label: {
    ...TYPOGRAPHY.openSans_semi_bold,
    ...FONTSIZE.medium,
    color: COLORS.main
  },
  radio_wrapper: {
    flex: 1
  },
  radio_option_wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  detail_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detail: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },
  backButton: {
    backgroundColor: COLORS.neutral_min,
    borderColor: COLORS.neutral_light,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 4,
      },
    })
  },
  backButtonSize: {
    ...SIZE.square_20
  },
});

export default CartStyles
