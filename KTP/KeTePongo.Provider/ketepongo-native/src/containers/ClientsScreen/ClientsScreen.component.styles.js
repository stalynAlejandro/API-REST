import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********** Main

  // ********** UI

  alert_container: {
    position: 'absolute',
    zIndex: 100,
    width: 294,
    height: 201,
    top: 240,
    left: (LAYOUT.WINDOW.width - 294) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 10,
  },
  top_alert_text_wrapper: {
    alignItems: 'center'
  },
  main_font_14: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main
  },
  middle_alert_text: {
    textAlign: 'center',
    paddingLeft: 11,
    paddingRight: 11
  },
  btn_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text_ok: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large
  },
  btn_ok: {
    height: 40,
    width: 123,
    borderRadius: 5
  },
  client_card_detail_wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  card_detail_text: {
    color: COLORS.neutral_super_strong,
    ...FONTSIZE.normal,
    marginLeft: 5
  },
  pending_card_employee_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  client_detail_wrapper: {
    marginBottom: 8,
    flex: 1
  },
  client_emaill_wrapper: {
    marginBottom: 8,
    flex: 1.3
  },
  pending_client_container: {
    width: LAYOUT.WINDOW.width - 40,
    height: 208,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 18,
    paddingBottom: 22,
  },
  pending_card_tradeName: {
    lineHeight: 19,
    color: COLORS.main,
    ...FONTSIZE.main,
    width: '100%',
    height: 41,
    marginBottom: 11,
  },
  btn_container: {
    marginTop: 10,
    flexDirection: 'row',
  },
});