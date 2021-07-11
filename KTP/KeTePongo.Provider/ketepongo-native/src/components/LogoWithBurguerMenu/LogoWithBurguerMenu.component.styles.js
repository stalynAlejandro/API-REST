import { StyleSheet } from 'react-native';
import { HEIGHT } from 'constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10 
  },
  top_section: {
    flex: 1,
    justifyContent: 'center'
  },
  logo_wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...HEIGHT.catalogHeading
  },
  fillSpace: {
    flex: 1
  },
  burguer_menu_wrapper: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 15
  },
});