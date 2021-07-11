import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, HEIGHT, TYPOGRAPHY } from 'constants';

export default StyleSheet.create({
  // ********** Main
  fillScreen: {
    flex: 1
  },
  body: {
    flex: 1,
    marginTop: HEIGHT.topHeaderHeight.height,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: COLORS.neutral_lightest
  },
  
  // ********** UI

  btn_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    width: '100%',
    height: 44,
    borderRadius: 10,
    marginBottom: 20
  },
  btn_link_text: {
    color: COLORS.neutral_min,
    marginLeft: 30,
    ...FONTSIZE.secondary_small
  },
  input_section_container: {
    flex: 1,
    marginTop: 50
  },
  input_wrapper: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 0,
    marginBottom: 40
  },
  placeholder: {
    ...FONTSIZE.normal,
    ...TYPOGRAPHY.openSans_light
  },
  code_input: {
    paddingBottom: 0
  },
  pencil_wrapper: {
    marginTop:10
  },
  heading: {
    color: COLORS.neutral_medium_strong,
    ...FONTSIZE.small
  },
  pending_client_card_container: {
    width: 320,
    height: 166,
    borderRadius: 10,
    padding: 11,
    justifyContent: 'space-between',
    backgroundColor: COLORS.neutral_min
  },
  pending_client_card_top: {
    flex: 1
  },
  tradeName: {
    color: COLORS.main,
    ...FONTSIZE.super_main
  },
  pending_client_card_bottom: {
    flexDirection: 'row',
    flex: 1
  },
  bottom_card_text:{
    ...FONTSIZE.normal,
    color: COLORS.neutral_super_strong
  },
  pending_client_section: {
    flex: 1
  },
  header_container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  heading_wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 35,
  }
});