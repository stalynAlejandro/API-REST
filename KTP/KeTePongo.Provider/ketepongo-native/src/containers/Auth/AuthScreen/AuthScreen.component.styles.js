import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********** Main
  container: {
    backgroundColor: COLORS.neutral_min,
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-between',
    paddingLeft: 25,
    paddingRight: 25,
  
  
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  logo: {
    alignSelf: 'center',
    marginTop: 80
  },
  fillSpace: {
    flex: 1
  },

  footer_wrapper: {
    marginBottom: 16,
    marginLeft:5,
  },
  inner_footer_wrapper: {
    marginTop: 16,
  },

  // ********** UI

  register_btn_wrapper: {
    marginTop: 56
  },
  register_btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min,
  },
  loginText_wrapper: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingRight:15,
    paddingLeft:15
    
  },
  loginText: {
    ...FONTSIZE.normal,
    ...TYPOGRAPHY.openSans,
    color: COLORS.main
  },
  loginText_bold: {
    ...FONTSIZE.normal,
    ...TYPOGRAPHY.openSans_bold,
    color: COLORS.secondary,
  },
  session_closed_container: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 166,
    width: 294,
    height: 249,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  session_closed_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  session_closed_middle: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
 
  ok_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_small
  },
  ok_button: {
    backgroundColor: COLORS.main,
    height: 40,
    width: 132,
    ...TYPOGRAPHY.openSans_bold
  },
});
