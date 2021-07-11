import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTSIZE, LAYOUT, HEIGHT } from 'constants';

export default StyleSheet.create({
  section: {
    backgroundColor: "rgba(196, 196, 196, 0.15)",
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 15,
  },
  heading_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 18,
    height: 40
  },
  heading: {
    ...FONTSIZE.tertiary,
    color: COLORS.main,
    lineHeight: 18
  },
  option_list_height: {
    maxHeight: 260
  },
  selected_option: {
    ...FONTSIZE.tertiary,
    color: COLORS.gray_2,
    paddingLeft: 20,
    paddingBottom: 10,
    lineHeight: 18
  },
  option_text_wrapper: {
    paddingVertical: 14,
    justifyContent: 'center'
  },
  option_text: {
    paddingLeft: 18,
    ...FONTSIZE.secondary_large,
    color: COLORS.black,
    lineHeight:22
  },
  selected_container:{
    borderTopWidth:1,
    borderTopColor: COLORS.main,
    backgroundColor: COLORS.main_secondary_transparent,
    paddingTop: 13
  },
  option_text_selected: {
    color: COLORS.black,
    ...FONTSIZE.secondary_large,
    lineHeight:22
  },
  divider: {
    width: '100%',
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1
  },
  container:{
    flex: 1,
    backgroundColor: COLORS.neutral_min,
    paddingHorizontal: 16
  },
  scrollView: {
    height: LAYOUT.WINDOW.height - HEIGHT.navigationHeight.height,
    paddingBottom: 27
  },
  filters_wrapper: {
    marginTop: 32,
    marginBottom: "auto"
  },
  btn_wrapper:{

  },
  btn: {
    backgroundColor: COLORS.main,
    borderRadius: 4,
    alignItems: 'center',
    height: 44,
    paddingVertical: 10,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  btn_text: {
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_min
  }
});
