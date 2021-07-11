import { StyleSheet, Platform } from 'react-native';
import { FONTSIZE, COLORS, HEIGHT, LAYOUT } from 'constants';

export default StyleSheet.create({
  fillSpace: {
    flex: 1
  },
  body: {
    flex: 1,
    paddingTop: HEIGHT.topHeaderHeight.height
  },
  warning_container: {
    paddingTop: 0,
  },
  warning_message: {
    color: COLORS.KO,
    ...FONTSIZE.small,
  },
  employee_card: {
    backgroundColor: COLORS.neutral_min,
    justifyContent: 'space-between',
    height: 137,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: COLORS.neutral_light,
    borderBottomWidth: 1
  },
  notValid: {
    backgroundColor: COLORS.neutral_superlight,
  },
  card_section: {
    padding: 0,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  employee_icon_and_value_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  employee_icon_and_role: {
    flexDirection: 'row',
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-start',
  },
  card_role: {
    color: COLORS.main,
    paddingLeft: 8,
  },
  card_info: {
    paddingLeft: 5,
    ...FONTSIZE.tertiary
  },
  card_bottom_section: {
  },
  scrollView: {
    flex: 1
  },
  add_employee_icon: {
    position: 'absolute',
    zIndex: 100,
    marginTop: LAYOUT.WINDOW.height - 80,
    marginLeft: 35
  },
  search_wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 0,
    marginBottom: 16,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1
  },
  search_icon: {
    marginBottom: 3
  },
  search_input: {
    width: '100%',
    height: 35,
    paddingBottom: 0,
    alignItems: 'flex-end', 
    ...FONTSIZE.tertiary,
  },
  transparent: {
    position: 'absolute',
    backgroundColor: COLORS.shadow,
    ...HEIGHT.topHeaderHeight,
    width: '100%',
    zIndex: 50,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: {
    position: 'absolute',
    backgroundColor: COLORS.neutral_min,
    ...HEIGHT.topHeaderHeight,
    width: '100%',
    zIndex: 100,
    paddingBottom: 1.5
  },
});