import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********** Main
  fillScreen: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    marginTop: 10,
    zIndex: 0
  },
  // ********** Ui

  transitionContainer: {
    paddingTop: 21
  },
  icon_wrapper: {
    alignItems: 'center',
    marginBottom: 60
  },
  lost_icon: {
    ...SIZE.square_160
  },
  transition_text_wrapper: {
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 40,
  },
  transition_title: {
    ...FONTSIZE.secondary,
    color: COLORS.neutral_super_strong,
    marginBottom: 20
  },
  transition_body: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_super_strong,
    marginBottom: 20
  },
  transition_footer: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_super_strong,
  },
  btn_wrapper: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  add_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large
  },
  main_btn: {
    backgroundColor: COLORS.main,
    width: '100%',
    marginBottom: 10
  },
  description: {
    ...FONTSIZE.medium,
    color: COLORS.neutral_light_medium,
    lineHeight: 14
  },
  content: {
    ...FONTSIZE.medium,
    color: COLORS.neutral_black,
    lineHeight: 14
  },
  name_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product_name: {
    width: '93%',
    lineHeight: 16,
    height: 48,
    ...FONTSIZE.medium,
    color: COLORS.main,
  },
  edit_area: {
    height: 40,
    width: 80
  },
  product_container: {
    flex: 1,
    height: 134,
    flexDirection: 'row',
    borderBottomColor: COLORS.neutral_light,
    borderBottomWidth: 1.5,
    paddingLeft: 10,
    paddingTop: 9,
    paddingBottom: 9,
    backgroundColor: COLORS.neutral_min
  },
  add_margin_bottom: {
    marginBottom: 55
  },
  image_wrapper: {
    width: 116,
  },
  product_description: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  product_details: {
    width: '100%'
  },
  quantity_wrapper: {
    flex: 1,
  },
  comment_container: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 85,
    width: 294,
    height: 311,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    paddingTop: 19,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12
  },
  comment: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },
  text_input: {
    flex: 1,
    borderBottomColor: COLORS.neutral_medium_strong,
    borderBottomWidth: 1,
    marginBottom: 19,
    color: COLORS.main,
    textAlignVertical: 'top',
  },
  comment_btn_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  cancel_btn: {
    textAlign: 'center',
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_strong
  },
  accept_btn_wrapper: {
    width: 123,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.main,
    borderRadius: 5
  },
  accept_btn: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large
  }
});