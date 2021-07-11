import { StyleSheet } from 'react-native';
import { TYPOGRAPHY, FONTSIZE, COLORS, SIZE } from "constants";

export default StyleSheet.create({
  body: {
    paddingLeft: 33,
    paddingRight: 33,
  },
  input: {
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.medium,
    color: COLORS.main,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingBottom: 0,
    marginBottom: 30,
    paddingLeft: 0
  },
  name_wrapper: {
    paddingBottom: 0,
    paddingLeft: 0,
    marginBottom: 30
  },
  email_wrapper: {
    paddingBottom: 0,
    paddingLeft: 0,
    marginBottom: 30
  },
  fillScreen: {
    flex: 1
  },
  password_wrapper: {
    paddingBottom: 0,
    marginBottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  less_margin: {
    marginBottom: 13
  },

  icon_size: {
    ...SIZE.square_20
  },
  helper_text_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 0,
    marginTop: 0
  },
  helper_text_wrapper_with_margin:{
    marginTop: 15
  },
  helper_text: {
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.small,
    color: COLORS.main
  },
  helper_highlight: {
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.small,
    color: COLORS.secondary
  },
  error_text: {
    color: COLORS.KO,
    ...FONTSIZE.normal
  },
  error_field:{
    marginTop: -5,
    marginBottom: 15
  },
  password_error_field:{
    marginBottom: 15,
    marginLeft: 5,
  },
  password_hint:{
    fontWeight: "normal",
    ...FONTSIZE.normal,
    lineHeight: 15,
    fontStyle: "italic",
    color: COLORS.neutral_super_strong,
    alignSelf: "flex-start",
    marginLeft: 5,
    marginTop: -2,
  },
  policy_text:{
    
    ...FONTSIZE.normal,
    
    lineHeight: 15,
    color: COLORS.neutral_super_strong,
    
  },
  password_hint_error:{
    fontWeight: "normal",
    ...FONTSIZE.normal,
    lineHeight: 15,
    fontStyle: "italic",
    color: COLORS.KO,
    alignSelf: "flex-start",
    marginLeft: 5,
    
  },
  password_hint_container:{
    flexDirection: 'row',
  },
  policy_container:{
    flexDirection: 'row',
    marginTop:10
  },
  password_hint_container_error:{
    flexDirection: 'row',
    marginTop: -10,
    marginBottom:40,
  },
  alert_icon:{
    marginLeft: -20,
    alignSelf: "flex-start"
  },
  alert_icon_error:{
    marginLeft: -20,
    alignSelf: "flex-start",
    color: COLORS.KO,
  }
});
