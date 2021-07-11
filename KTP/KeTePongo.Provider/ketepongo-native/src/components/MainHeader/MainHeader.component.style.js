import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS } from 'constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  burguer_section: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  burguer_wrapper: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  menu: {
    ...FONTSIZE.extra_small,
    marginTop: 5,
    color: COLORS.main
  }
});