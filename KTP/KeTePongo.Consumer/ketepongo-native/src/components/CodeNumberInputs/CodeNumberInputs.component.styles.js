import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants';

export default StyleSheet.create({
  input: {
    flex: 1,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingBottom: 0,
    width: 37,
    height: 50,
    margin: 5,
    ...FONTSIZE.max_super,
    ...TYPOGRAPHY.openSans_semi_bold,
    color: COLORS.main,
    textAlign: 'center',
  },
  input_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
});
