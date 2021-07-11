import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********** Main
  btn_text_main: {
    color: COLORS.main,
    ...FONTSIZE.secondary_large
  },
  btn_text_add_section: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },

  main_btn: {
    backgroundColor: COLORS.neutral_min,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    color: COLORS.neutral_medium_strong,
    borderColor: COLORS.main,
    borderRadius: 4
  },
  secondary_btn: {
    height: 48,
    color: COLORS.gray_3,
    backgroundColor: COLORS.neutral_medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  secondary_btn_enabled:{
    color: COLORS.neutral_min,
    backgroundColor: COLORS.main
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral_min
  },
  body: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "column"
  },
  no_sections:{
    ...FONTSIZE.medium,
    color: COLORS.neutral_super_strong,
    paddingLeft:20
  },
  scrollView_wrapper: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  body_scroll_element:{
    marginTop: 32
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
  fillScreen: {
    flex: 1
  },
  input_text_container: {
    flex:1,
    flexDirection: 'row',
    marginTop:20,
    alignItems:'flex-start'

  },
  fake_placeholder: {
    color: COLORS.neutral_medium_strong,
    ...FONTSIZE.medium,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    width: '95%'
  },
  input_text: {
    ...FONTSIZE.tertiary,
    width: '95%',
    paddingRight:20,
    color: COLORS.neutral_super_strong,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingBottom:0,
    paddingTop:0,

  },
  sections_header: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flexDirection: "column",
    paddingBottom: 5,
    marginVertical: 16
  },
  secondary_heading: {
    color: COLORS.neutral_super_strong,
    ...FONTSIZE.normal,
    marginTop: 16
  },
  scrollView: {
    flex: 1,
    paddingLeft: 10,
  },
  btn_wrapper: {
    margin: 15,
    marginTop: 15,
  },
  product_detail_input: {
    top: 150,
    width: '100%',
    height: 200,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    paddingTop: 15,
  },
  heading: {
    color: COLORS.black,
    ...FONTSIZE.secondary_small,
    textAlign: 'center',
    marginBottom: 20
  },
  input_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 67,
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
  btn_disabled:{
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.neutral_medium
  },
  btn_text: {
    color: COLORS.neutral_min,
    textAlign: 'center',
    ...FONTSIZE.secondary_small,
  },
  btn_text_disabled: {
    color: COLORS.neutral_strong,
    textAlign: 'center',
    ...FONTSIZE.secondary_small,
  },
  field_label:{
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    lineHeight: 19,
    flexDirection: "row",
    marginBottom: 5,
  },
  field_required_hint:{
    marginTop: 8,
    ...FONTSIZE.extra_super_small,
    color: COLORS.neutral_strong,
  },
  vegan_container: {
    flexDirection: "row",
  },
  vegan_info_container:{
    width: "90%"
  },
  vegan_checkbox:{
    alignSelf: "center"
  },
  vegan_description:{
    ...FONTSIZE.normal,
    lineHeight: 15,
  },
  error_container_styles:{
    paddingRight: 10,
    paddingLeft: 20,
    marginTop: 10
  },
  server_error_field:{
    marginTop: 10
  },
  container_space_for_last_error:{
    height:40,
     backgroundColor:COLORS.neutral_min,
  },
  closeButton:{
    ...FONTSIZE.max_super,
    position: "absolute",
    right: 9,
    top: 8,
    color: COLORS.neutral_strong
  },
  product_hidden_container:{
    ...Platform.select({
      ios: {
        paddingRight: 15,
      },
    }),
  },
  product_hidden_checkbox:{
    alignSelf: "flex-end"
  },
  pencil_icon:{
      marginLeft: -15,
  }
});
