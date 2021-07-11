import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTSIZE, LAYOUT, HEIGHT } from 'constants';

export default StyleSheet.create({
  section: {
    backgroundColor: COLORS.neutral_light,
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
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_medium_strong,
    paddingLeft: 20,
    paddingBottom: 10,
    lineHeight: 18
  },
  option_text_wrapper: {
    height: 33,
    justifyContent: 'center'
  },
  option_text: {
    paddingLeft: 18,
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_light_medium,
  },
  option_text_selected: {
    color: COLORS.main,
    backgroundColor: COLORS.sky_light
  },
  divider: {
    width: '100%',
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1
  },
  container:{
    flex: 1,
  },
  scrollView: {
    height: LAYOUT.WINDOW.height - HEIGHT.navigationHeight.height,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 27,
  },
  filters_wrapper: {
    paddingTop: 15,
  },
  btn_wrapper: {
    marginTop: 22,
    marginBottom: 10
  },
  btn: {
    backgroundColor: '#112C45',
    borderRadius: 4,
    alignItems: 'center',
    paddingTop: 11,
    height: 44,
    paddingBottom: 20,
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