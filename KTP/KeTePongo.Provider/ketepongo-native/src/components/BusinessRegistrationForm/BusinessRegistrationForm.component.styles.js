import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY,LAYOUT} from 'constants';

export default StyleSheet.create({
  body: {
    paddingLeft: 33,
    paddingRight: 33,
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    ...TYPOGRAPHY.openSans_semi_bold,
    ...FONTSIZE.medium,
    color: COLORS.neutral_super_strong,
    borderBottomColor: COLORS.main_secondary,
    borderBottomWidth: 1,
    width: '90%',
    paddingBottom: 0,
    marginBottom: 28,
    paddingLeft: 0
  },
  input_empty: {
    ...TYPOGRAPHY.openSans_light,
    ...FONTSIZE.medium,
    color: COLORS.neutral_medium_strong,
    width: '90%',
  },
  error_input: {
    borderBottomColor: COLORS.KO
  },
  less_margin: {
    marginBottom: 13
  },
  error_text: {
    ...FONTSIZE.small,
    color: COLORS.KO,
    lineHeight: 14,
    marginVertical: 5,
    marginBottom: 10
  },
  two_input_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  half_input: {
    width: '45%'
  },
  hidden_input: {
    width:0,
    height:0,
    opacity: 0,
  },
  input_wrapper: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },

  pencil_icon: {
    width: '10%',
  },
  intput_icon: {
    width: '80%',
  },
  view_container: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image_info: {
    ... FONTSIZE.medium,
    marginBottom:20
  },
  code_info: {
    ... FONTSIZE.normal,
    marginTop:17,
    marginBottom:5
  },
  code_info_2: {
    ... FONTSIZE.normal,
    marginBottom:20
  },
  code: {
    ... FONTSIZE.top_max,
    color:COLORS.main,
    marginBottom:40
  },
  code_wrapper:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  label_input: {
    ... FONTSIZE.secondary_small,
    color:COLORS.main
  },
  hint_input: {
    ... FONTSIZE.extra_super_small,
    color:COLORS.neutral_strong,
    marginLeft:5,
    marginTop:-10,
    marginBottom:25
  },
  label_info: {
    ... FONTSIZE.normal,
    color:COLORS.neutral_super_strong,
    marginTop:16
  },
  label_button: {
    ... FONTSIZE.medium,
    color:COLORS.main,
    marginTop:2
  },
  input_wrapper: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },

  pencil_icon: {
    width: '10%',
  },
  intput_icon: {
    width: '80%',
  },
  view_container: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image_info: {
    ... FONTSIZE.normal,
    marginBottom:20
  },
  label_input: {
    ... FONTSIZE.secondary_small,
    color:COLORS.main
  },
  hint_input: {
    ... FONTSIZE.extra_super_small,
    color:COLORS.neutral_strong,
    marginLeft:5,
    marginTop:-10,
    marginBottom:25
  },
  label_info: {
    ... FONTSIZE.normal,
    color:COLORS.neutral_super_strong,
    marginTop:16
  },
  label_button: {
    ... FONTSIZE.medium,
    color:COLORS.main,
    marginTop:2
  },
  add_sanitary_measure_container:{
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 37,
    width: 294,
    height: 311,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    padding: 16,

  },
  add_sanitary_measure_input:{
    height: 200,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
    marginTop:28,
  },
  add_sanitary_measure_buttons_container:{

    flex:1,
    flexDirection:'row',
    alignItems: 'center',
  },
  ok_button:{
    backgroundColor: COLORS.neutral_min,
    color: COLORS.main,
    ...TYPOGRAPHY.openSans_bold,
    ... FONTSIZE.secondary_large,
    width:'50%'
  },
  ko_button:{
    backgroundColor: COLORS.neutral_min,
    color: COLORS.neutral_strong,
    ...TYPOGRAPHY.openSans,
    ... FONTSIZE.secondary_large,
    width:'50%'
  },
  ok_btn_text: {
    color: COLORS.main,
    ... FONTSIZE.secondary_large,
    ...TYPOGRAPHY.openSans_bold,
    textAlign: 'center'
  },
  ko_btn_text: {
    color: COLORS.neutral_strong,
    ...TYPOGRAPHY.openSans,
    ... FONTSIZE.secondary_large,
    textAlign: 'center'
  },
  separator_line:{
    marginTop:20,
    borderBottomColor: COLORS.neutral_medium_strong,
    borderBottomWidth: 1,
  },
  add_sanitary_mesaure_header:{
    color: COLORS.main,
    ... FONTSIZE.secondary_small,
  },
  add_sanitary_measure_button:{
    flex: 1,
    flexDirection: 'row',
    marginLeft: 80,
    marginTop: 40,
    marginBottom: 40
  },
  sanitary_measures_info:{
    ... FONTSIZE.normal,
    color:COLORS.neutral_super_strong,
    marginTop:16,
    marginBottom: 24
  },
  sanitary_measures_button:{
    marginRight: 5
  }
});
