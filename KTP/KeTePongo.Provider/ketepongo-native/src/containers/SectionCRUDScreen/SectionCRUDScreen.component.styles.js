import { StyleSheet } from 'react-native';
import {
  FONTSIZE,
  COLORS,
  TYPOGRAPHY,
  HEIGHT,
  LAYOUT
} from 'constants';

export default StyleSheet.create({
  //  ********** Main
  container: {
    flex: 1,
    backgroundColor:COLORS.neutral_min,
    justifyContent:"space-between",
    flexDirection: "column"
  },
  fillScreen: {
    flex: 1,
    backgroundColor:COLORS.neutral_min,
  },
  form_group:{
    flex: 1,
    flexDirection: "column"
  },
  body: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent:"space-between",
    flexDirection: "column"
  },
  scroll:{
    flex: 1,
    flexDirection: "column"
  },
  //  ********** Ui

  modal: {
    ...LAYOUT.defaultAlert
  },
  warningText_top: {
    marginBottom: 10
  },
  warningText: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    textAlign: 'center'
  },
  fillSpace: {
    flex: 1,
  },
  yes_no_wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondary_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main_80,
  },
  white_btn: {
    backgroundColor: COLORS.neutral_medium,
    width: 123,
    height: 40,
    marginRight: 10,
  },
  main_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
  },
  blue_btn: {
    backgroundColor: COLORS.main,
    width: 123,
    height: 40
  },
  btns_wrapper: {
    marginBottom: 18,
    backgroundColor: COLORS.neutral_min,
  },
  cancel_btn: {
    backgroundColor: COLORS.main,
    color: COLORS.neutral_min
  },
  eliminate_btn_text: {
    color: COLORS.main,
    ...FONTSIZE.secondary_large
  },
  delete_btn: {
    backgroundColor: COLORS.neutral_min,
    marginBottom: 10,
    borderColor:COLORS.main,
    borderWidth:1
  },
  save_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large
  },
  save_btn: {
    backgroundColor: COLORS.main,
  },
  save_btn_text_disable: {
    color: COLORS.neutral_medium_strong,
    ...FONTSIZE.secondary_large
  },
  disabled_btn: {
    backgroundColor: COLORS.neutral_medium,
  },
  input: {
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.tertiary,
    height: 40,
    paddingBottom: 0,
    color: COLORS.main,
    width: '100%',
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingRight:20
  },
  section_heading: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main
  },
  section_helper: {
    ...FONTSIZE.normal,
    color: COLORS.neutral_super_strong,
    marginTop:16,
    marginBottom:0
  },
  row:{
    flex:1,
    flexDirection:'row'
  },
  order_container:{
    
  },
  error_message_container:{
    paddingRight: 0,
    paddingLeft:0,
  },
  server_error_field:{
    marginTop: 40
  },
});
