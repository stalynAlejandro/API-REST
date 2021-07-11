import { StyleSheet } from 'react-native';
import { HEIGHT, FONTSIZE } from 'constants';

export default StyleSheet.create({
  main_heading: {
    ...FONTSIZE.secondary_large
  },
  secondary_heading: { 
    ...FONTSIZE.medium
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: HEIGHT.topHeaderHeight.height,
    paddingBottom: HEIGHT.bottomNavigationHeight.height,
  },
  status: { 
    height: 133,
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 15,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  status_left: {
  },
  status_right: {
    alignItems: 'flex-end',
    paddingTop: 12,
    paddingBottom: 12,
  },
  status_date_wrapper: {
    marginBottom: 15
  },
  order_product_list_container: {
    flex: 1
  }
});