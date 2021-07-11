import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  container: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section_left: {
    flex: 1,
    paddingLeft: 16,
  },
  section_heading: {
    flex: 4,
    alignItems: 'center',
  },
  section_heading_without_right: {
    flex: 5,
    alignItems: 'center',
  },
  main_heading: {
    color: COLORS.black,
    ...FONTSIZE.secondary_large
  },
  section_right: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
  }
});
