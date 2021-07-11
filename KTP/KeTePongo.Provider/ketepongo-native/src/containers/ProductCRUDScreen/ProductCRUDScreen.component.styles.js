import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********** Main  
  btn_text_main: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },
  main_btn: {
    backgroundColor: COLORS.neutral_medium,
    justifyContent: 'center',
    alignItems: 'center'
  },
  delete_btn: {
    color: COLORS.main,
    backgroundColor: COLORS.neutral_light,
    justifyContent: 'center',
    alignItems: 'center'
  },
  save_btn: {
    color: COLORS.neutral_min,
    backgroundColor: COLORS.ok,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1, 
    backgroundColor: COLORS.white
  },
  body: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  scrollView_wrapper: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  // ********** UI

  delete_alert_wrapper: {
    ...LAYOUT.defaultAlert,
  },
  delete_alert_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  option: {
    borderBottomColor: COLORS.neutral_superlight,
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    height: 45,
    justifyContent: 'center',
  },
  highlightBackground: {
    backgroundColor: COLORS.neutral_superlight,
    marginRight: 0,
    marginLeft: 0,
    paddingLeft: 20,
    paddingRight: 20
  },
  provider_name: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
  },
  provider_list_container: {
    zIndex: 1000,
    backgroundColor: COLORS.neutral_min,
    marginTop: 316,
    height: 500,
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    paddingLeft: 20,
    paddingRight: 20,
  },
  primary_heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },
  single_provider_list: {
    ...FONTSIZE.small,
    color: COLORS.main,
  },
  fillScreen: {
    flex: 1
  },
  providerSelection_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_medium_strong,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral_medium_strong,
    marginBottom: 20
  },
  selected_provider_name: {
    color: COLORS.main,
    ...FONTSIZE.small
  },
  placeHolder_name: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 30 ,
    height: 65
  },
  fake_placeholder: {
    color: COLORS.neutral_medium_strong,
    ...FONTSIZE.normal,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    width: '90%'
  },
  product_name: {
    ...FONTSIZE.main_large,
    width: '90%',
    color: COLORS.main,
  },
  edit_product_name: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: 65,
    alignItems: 'flex-start'
  },
  locations_header: {
    paddingBottom: 5
  },
  secondary_heading: {
    color: COLORS.main,
    ...FONTSIZE.small
  },
  scrollView: {
    flex: 1,
    paddingLeft: 10
  },
  btn_wrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  product_detail_input: {
    top: 215,
    width: '100%',
    height: 200,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    paddingTop: 15,
  },
  heading: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    textAlign: 'center',
    paddingTop: 20,
    marginBottom: 20
  },
  input_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    ...TYPOGRAPHY.openSans_light,
    ...FONTSIZE.normal
  },
  input: {
    paddingBottom: 5
  },
  btn: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.secondary
  },
  btn_text: {
    color: COLORS.neutral_min,
    textAlign: 'center',
    ...FONTSIZE.secondary_small,
  },
  provider_heading_name: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    marginLeft: 18,
  },
});