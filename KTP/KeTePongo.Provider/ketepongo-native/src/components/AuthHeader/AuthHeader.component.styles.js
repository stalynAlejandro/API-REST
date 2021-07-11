import { StyleSheet } from 'react-native';
import { SIZE, COLORS } from 'constants';

export default StyleSheet.create({
  header_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_section: {
    flex: 1,
    marginLeft: 30
  },
  back_arrow_wrapper: {
    ...SIZE.square_19,
    borderRadius: 100,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30
  },
  back_arrow: {
    ...SIZE.square_19,
  },
  header_logo_wrapper: {
    flex: 1
  },
  header_logo: {
    height: 26,
    width: 123
  }
});
