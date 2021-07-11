import { StyleSheet } from 'react-native';
import { COLORS, HEIGHT, FONTSIZE, LAYOUT, SIZE } from 'constants';
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
  header_height:{
    height: 60
  },
  search_container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
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
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
},
arrow: {
    ...SIZE.square_25,
},
});