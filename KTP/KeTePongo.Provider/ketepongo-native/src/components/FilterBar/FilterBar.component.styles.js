import { StyleSheet } from 'react-native';
import { COLORS, HEIGHT, FONTSIZE, LAYOUT } from 'constants';
import { TYPOGRAPHY } from '../../constants/Typography';

export default StyleSheet.create({
  container: {
    width: LAYOUT.WINDOW.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    ...HEIGHT.catalogHeading,
    paddingRight:15,
    paddingLeft:15
  },
  search_container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '68%',
    padding:0,
    backgroundColor: COLORS.neutral_superlight,
    borderRadius: 10,
  },
  search_icon: {
    marginLeft: 10,
    marginRight: 10
  },
  searchInput: {
    ...FONTSIZE.tertiary,  
    width: '85%',
    ...TYPOGRAPHY.openSans_light,
    padding:5,
  },
  burguer_wrapper: {
    paddingTop: 3,
    justifyContent: 'center',
    alignItems:'center'
  },
});