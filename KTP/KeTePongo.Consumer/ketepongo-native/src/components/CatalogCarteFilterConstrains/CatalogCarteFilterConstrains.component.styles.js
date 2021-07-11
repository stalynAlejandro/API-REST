import { StyleSheet, Platform } from 'react-native';
import { FONTSIZE, SIZE } from 'constants';

export default StyleSheet.create({
  constrain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon_size: {
    ...SIZE.square_20
  },
  name: {
    ...FONTSIZE.medium
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    ...Platform.select({
      ios: {
        paddingBottom: 2,
        height: 44,
        marginTop: 2
      },
    }),
  },
  content_container_scrollView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 35,
    marginTop:9,
    paddingBottom:1
  },
  constrain_wrapper: {
    flexDirection: 'row',
    marginLeft:10
  },
});
