import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({

  detail_container: {
    alignItems: 'center'
  },
  icon_wrapper:{
    height: 41,
    width: 41,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  icon_text: {
    ...FONTSIZE.small
  },
  detail_icons_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  main_color: {
    color: COLORS.main
  },
  secondary_color: {
    color: COLORS.secondary
  },
  grey_color: {
    color: COLORS.neutral_medium_strong
  },
  arrow_wrapper:{
    justifyContent: 'center',
    width: 25
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
  client_card_container: {
    justifyContent: 'space-between',
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 86,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  client_card_tradeName: {
    flex: 3,
    paddingRight: 20
  },
  client_card_detail_container: {
    flex: 3,
    justifyContent: 'space-between'
  },
  vertical_dots_container: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vertical_dots_wrapper: {
    width: 30,
    height: 30
  }
});