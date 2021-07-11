import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, HEIGHT } from 'constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width: '100%',
    height: 60,
    paddingRight: 16,
  },
  underLine: {
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1
  },
  icon_wrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
  name_wrapper: {
    flex: 2.5,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main,
  },
  name_1: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    paddingRight:15,
  },
  name_edit: {
    ...FONTSIZE.secondary_large,
    color: COLORS.main,
  },
  pencil_wrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  selectionList: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.neutral_min,
    marginTop: HEIGHT.topHeaderHeight.height ,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: HEIGHT.navigationHeight.height + 10,
    alignContent: "space-between"
  }
});
