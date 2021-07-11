import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT } from 'constants';

export default StyleSheet.create({
  // ********** UI

  menu_section: {
    flex: 1,
    justifyContent: 'center',
    height:45,
    borderBottomColor:COLORS.neutral_medium,
    borderBottomWidth:1
  },
  menu_heading: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_max,
    paddingLeft: 26
  },
  menu_container: {
    left: LAYOUT.WINDOW.width - 267,
    top: 0,
    width: 267,
    height: 315,
    zIndex: 500,
    paddingLeft:8,
    backgroundColor: COLORS.neutral_min,
    flexDirection:'column',
    justifyContent:'space-between',
    borderTopColor:COLORS.neutral_medium,
    borderTopWidth:1
  },
  menu_close_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent:'flex-start',
    alignItems:'flex-start',
    paddingRight: 15,
    paddingLeft: 4,
    paddingTop: 4,
  },
  burguer_btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  burguer: {
    ...SIZE.square_20
  },
  menu: {
    color: COLORS.main,
    ...FONTSIZE.extra_small
  },
  menu_item_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 15,
  },
  version:{
  ...FONTSIZE.extra_small,
  textAlignVertical:'top',
  color: COLORS.gray_3
},
  delete_alert_wrapper: {
    ...LAYOUT.defaultAlert,
  },
  delete_alert_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
});