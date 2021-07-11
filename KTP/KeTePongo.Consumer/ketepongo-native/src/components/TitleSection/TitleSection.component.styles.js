import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  container: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  section_heading: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  main_heading: {
    color: COLORS.black,
    ...FONTSIZE.secondary_large
  },
 
});
