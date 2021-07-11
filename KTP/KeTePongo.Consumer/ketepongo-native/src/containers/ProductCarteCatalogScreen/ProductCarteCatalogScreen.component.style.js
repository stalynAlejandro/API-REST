
import { StyleSheet, Platform } from 'react-native';
import { COLORS, HEIGHT, LAYOUT, FONTSIZE, SIZE, TYPOGRAPHY } from 'constants';

export default StyleSheet.create({
  // ********** Main
  fillScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral_min
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.neutral_min,
    paddingBottom: HEIGHT.bottomNavigationHeight.height,
  },

  // ********** UI
  sku_number: {
    position: 'absolute',
    zIndex: 100,
    ...FONTSIZE.secondary,
    color: COLORS.main,
    paddingTop: 5
  },
  cart_icon: {
    ...SIZE.square_55
  },
  cart_wrapper: {
    zIndex: 500,
    position: 'absolute',
    marginTop: LAYOUT.WINDOW.height - HEIGHT.topHeaderHeight.height - 30,
    right: (LAYOUT.WINDOW.width - 55 )/ 2,
    ...SIZE.square_55,
    borderRadius: 100,
  },
  center_items: {
    alignItems: 'center',
  },
  errorMessage: {
    zIndex: 10000,
  },
  addBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    opacity: .7,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 40,
    borderColor: COLORS.primaryBlueDark,
    borderWidth: .5,
    zIndex: 500,
    marginLeft: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navigation: {
    ...HEIGHT.navigationHeight,
    borderTopColor: COLORS.neutral_medium,
    borderTopWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: .5,
      },
    }),
  },
  confirm_alert_container: {
    ...LAYOUT.defaultAlert
  },
  delete_alert_wrapper: {
    ...LAYOUT.defaultAlert,
  },
  delete_alert_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  body_alert_text: {
    textAlign: 'center',
    width: '80%',
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    marginBottom: 20
  },
  regular_text: {
    ...TYPOGRAPHY.openSans
  },
  bold_text: {
    ...TYPOGRAPHY.openSans_semi_bold
  },
  main_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
  },
  blue_btn: {
    height: 40,
    width: 123,
    marginLeft: 5,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drag_header_container:{
    flexDirection:'column'
  },
  drag_subtext:{
    alignSelf:'center',
    ...FONTSIZE.medium,
    color: COLORS.neutral_super_strong,
  },
  subHeader_title:{
    ...FONTSIZE.main_large,
    color: COLORS.neutral_super_strong,
    textAlign: 'center',
  },
  subHeader_container:{
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom:26,
    marginTop:86
  },
  radio_white: {
    backgroundColor: COLORS.neutral_min
  },
  radio_selected: {
    backgroundColor: COLORS.main
  },
  radio_option_label: {
    ...TYPOGRAPHY.nunito_semi_bold,
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
    marginTop:28,
    marginLeft:20
  },
});