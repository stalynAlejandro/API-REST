import { StyleSheet } from 'react-native';
import { HEIGHT, COLORS, FONTSIZE } from 'constants';

export default StyleSheet.create({
  top_wrapper: {
    flexDirection: 'row',
    marginBottom: 10 
  },
  top_section: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    ...HEIGHT.catalogHeading
  },
  burguer_menu_wrapper: {
    alignItems: 'flex-end',
    paddingRight: 15
  },
  heading_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading_title: {
    marginLeft: 15,
    paddingRight: 15,
    color: COLORS.main,
    ...FONTSIZE.secondary_large
  },
});