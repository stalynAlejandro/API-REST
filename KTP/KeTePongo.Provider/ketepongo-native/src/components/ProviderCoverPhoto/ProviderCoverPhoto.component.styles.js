import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZE, FONTSIZE } from 'constants';

export default StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  add_text: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },
  image_wrapper: {
    width: '100%',
    height: 283,
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  noPhoto_wrapper: {
    width: '100%',
    height: 283,
    marginBottom: 40,
    backgroundColor: COLORS.neutral_medium
  },
  icon_wrapper: {
    paddingTop: 70
  },
  backButton: {
    backgroundColor: COLORS.neutral_min,
    ...SIZE.square_30,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow_blue,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  arrow_size: {
    ...SIZE.square_20
  },
  btns_wrapper: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    zIndex: 100
  },
  pencil_wrapper: {
    backgroundColor: COLORS.neutral_min,
    ...SIZE.square_30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow_blue,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  provider_name: {
    color: COLORS.main,
    position: 'absolute',
    ...FONTSIZE.medium,
    marginTop: 180,
    marginLeft: 18,
    zIndex: 100,
  },
  product_ref: {
    color: COLORS.main,
    position: 'absolute',
    ...FONTSIZE.normal,
    marginTop: 210,
    marginLeft: 18,
    zIndex: 100,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  info_wrapper: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.neutral_min_70,
    borderRadius: 5,
    width: 112,
    height: 67,
    paddingLeft: 18,
    justifyContent: 'center',
    marginTop: 163,
    marginLeft: 1
  },
  heading: {
    color: COLORS.main,
    ...FONTSIZE.medium
  },
  secondary: {
    color: COLORS.main,
    ...FONTSIZE.normal
  }
});