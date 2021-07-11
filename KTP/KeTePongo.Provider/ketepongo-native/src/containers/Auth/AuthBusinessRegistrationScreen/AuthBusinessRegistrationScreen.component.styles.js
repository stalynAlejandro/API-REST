import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SIZE} from 'constants';

export default StyleSheet.create({
  // ********** Main
  container: {
    backgroundColor: COLORS.main_background,
    flex: 1,
    paddingTop: 15,
    paddingBottom: 41
  },
  fillScreen: {
    flex: 1
  },

  // ********** UI

  stepper_icon: {
    alignItems: 'center',
    marginBottom: 43
  },
  heading: {
    ...FONTSIZE.super_main,
    color: COLORS.main,
    paddingLeft: 33,
    marginTop: 56,
    marginBottom: 8,
  },
  header_title: {
    ...FONTSIZE.secondary_large,
    color: COLORS.black,
    textAlign: 'center',
    position: 'absolute'
  },
  secondary_text: {
    ...FONTSIZE.normal,
    color: COLORS.main,
    marginBottom: 10,
    paddingLeft: 33,
  },
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
    borderRadius: 100
  },
  back_arrow: {
    ...SIZE.square_19
  },
  header_logo_wrapper: {
    flex: 1,
    alignItems: 'center'
  },
  header_logo: {
    height: 26,
    width: 103
  },
  serverError_container:{
    marginBottom: 10
  }
});
