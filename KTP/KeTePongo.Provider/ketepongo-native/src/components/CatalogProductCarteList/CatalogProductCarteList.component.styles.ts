import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT,HEIGHT } from 'constants';

export default StyleSheet.create({
  // ********** Main
  fillScreen: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    zIndex: 0,
    marginTop: 10
  },
  flatListWithProducts: {
    flex: 1,
    zIndex: 0
  },
  // ********** Ui
  delete_alert_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  delete_alert_wrapper: {
    ...LAYOUT.defaultAlert,
  },
  transitionContainer: {
    paddingTop: 5
  },
  icon_wrapper: {
    alignItems: 'center',
    marginBottom: 15
  },
  lost_icon: {
    ...SIZE.square_160
  },
  transition_text_wrapper: {
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 12,
  },
  transition_title: {
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_super_strong,
    marginBottom: 20
  },
  transition_body: {
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_super_strong,
    marginBottom: 20
  },
  transition_footer: {
    ...FONTSIZE.secondary_small,
    color: COLORS.neutral_super_strong,
  },
  btn_wrapper: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  add_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large
  },
  add_btn_secondary_text: {
    color: COLORS.main,
    ...FONTSIZE.secondary_large
  },
  main_btn: {
    backgroundColor: COLORS.main,
    width: '100%',
    marginBottom: 10
  },
  secondary_btn: {
    backgroundColor: COLORS.neutral_min,
    width: '100%',
    borderColor:COLORS.main,
    marginBottom: 10,
    borderWidth:1
  },
  description: {
    ...FONTSIZE.medium,
    color: COLORS.neutral_light_medium,
    lineHeight: 14
  },
  content: {
    ...FONTSIZE.medium,
    color: COLORS.neutral_black,
    lineHeight: 14
  },
  name_wrapper: {
    width: "100%",
    flexWrap: "nowrap",
    flexDirection: "row",
    marginBottom: 0
  },
  productCarte_name: {
    lineHeight: 18,
    flex: 1,
    ...FONTSIZE.tertiary,
    color: '#000000',
    marginBottom: 0
  },
  productCarte_name_hidden: {
    lineHeight: 18,
    flex: 1,
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_strong,
    marginBottom: 0
  },
  productCarte_description: {
    ...FONTSIZE.normal,
    lineHeight: 15,
    color: COLORS.neutral_strong,
    marginTop: 2,
    maxWidth: 289,
    marginBottom: "auto"
  },
  productCarte_descriptionText: {
    ...FONTSIZE.normal,
    fontWeight:'300',
    lineHeight: 15,
    color: COLORS.neutral_strong,
    marginTop: 2,
    maxWidth: 289,
    marginBottom: "auto"
  },
  watch_more:{
    color: COLORS.neutral_strong,
    fontWeight: "bold",
    fontSize: 11
  },
  edit_areaTwoButtons: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  edit_button:{
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 34
  },
  edit_area: {
    height: 40,
    width: 80
  },
  productCarte_container: {
    minHeight:90,
    borderBottomColor: COLORS.neutral_light,
    borderBottomWidth: 1.5,
    paddingLeft: 16,
    paddingTop: 9,
    paddingBottom: 5,
    paddingRight: 17,
    backgroundColor: COLORS.neutral_min,
    flexDirection: "column",
    justifyContent:'space-between'
  },
  productCarte_container_hidden: {
    minHeight:90,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1.5,
    paddingLeft: 16,
    paddingTop: 9,
    paddingBottom: 5,
    paddingRight: 17,
    backgroundColor: COLORS.neutral_superlight,
    flexDirection: "column",
    justifyContent:'space-between'
  },
  productCarte_container_drag_active: {
    borderLeftColor: COLORS.secondary_strong,
    borderLeftWidth: 4,
    backgroundColor: COLORS.secondary_light,
    minHeight:90,
    borderBottomColor: COLORS.neutral_medium,
    borderBottomWidth: 1.5,
    paddingLeft: 16,
    paddingTop: 9,
    paddingBottom: 5,
    paddingRight: 17,
    flexDirection: "column",
    justifyContent:'space-between'
  },
  add_margin_bottom: {
    marginBottom: 74
  },
  image_wrapper: {
    width: 116,
  },
  vegan_label:{
    flexGrow:0,
    flexShrink: 0,
    flexBasis: "auto",
    width: 53,
    height: 16,
    marginRight: 13,
    marginBottom: 0
  },
  productCarte_details: {
    width: '100%'
  },
  quantity_wrapper: {
    flex: 1,
  },
  comment_container: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 85,
    width: 294,
    height: 311,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    paddingTop: 19,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12
  },
  comment: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small
  },
  text_input: {
    flex: 1,
    borderBottomColor: COLORS.neutral_medium_strong,
    borderBottomWidth: 1,
    marginBottom: 19,
    color: COLORS.main,
    textAlignVertical: 'top',
  },
  comment_btn_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  cancel_btn: {
    textAlign: 'center',
    ...FONTSIZE.secondary_large,
    color: COLORS.neutral_strong
  },
  accept_btn_wrapper: {
    width: 123,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.main,
    borderRadius: 5
  },
  accept_btn: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large
  },
  section_container:{
    backgroundColor: COLORS.main_light,
    justifyContent: "center",
    height: 60,
    flexDirection:'row',
    alignItems:'center'
  },
  section_container_drag:{
    backgroundColor: COLORS.neutral_medium,
    justifyContent: "center",
    height: 60,
    flexDirection:'row',
    alignItems:'center'
  },
  section_description:{
    lineHeight: 25,
    textAlign: 'center',
    alignItems: 'center',
    position:'absolute',
    color: COLORS.main,
    ...FONTSIZE.main_large,
    
  },
  section_description_drag:{
    lineHeight: 25,
    textAlign: 'center',
    alignItems: 'center',
    position:'absolute',
    color: COLORS.gray_3,
    ...FONTSIZE.main_large,
  },
  productCarte_interactionContainer:{
    flexDirection: "row",
    alignItems: "center"
  },
  productCarte_interaction_buttons_container:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems:'flex-start' ,
    marginLeft: "auto",
    marginRight:10,
  },
  productCarte_section_interaction_buttons_container:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    paddingRight:17
  },
  productCarte_hidden_container:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    alignItems:'center'
  },
  pvpLabel:{
    marginRight: 5,
    ...FONTSIZE.medium,
    lineHeight: 16,
    color: COLORS.main
  },
  pvpLabel_hidden:{
    marginRight: 5,
    ...FONTSIZE.medium,
    lineHeight: 16,
    color: COLORS.neutral_strong
  },
  pvpLabel_drag:{
    marginRight: 5,
    ...FONTSIZE.medium,
    lineHeight: 16,
    color: COLORS.secondary_strong
  },
  hidden:{
    marginRight: 5,
    ...FONTSIZE.medium,
    color: COLORS.neutral_strong
  },
  productCarte_allergensDialogContainer:{
    ...LAYOUT.defaultAlert,
    borderRadius: 0,
    height: 538,
    top: (Dimensions.get('window').height - 538) / 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  productCarte_fullDescription_container:{
    ...LAYOUT.defaultAlert,
    borderRadius: 0,
    width: 294,
    left: (Dimensions.get('window').width - 294) / 2,
    top: (Dimensions.get('window').height - 181) / 2,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    height: "auto"
  },
  productCarte_fullDescription_header:{
    lineHeight: 19,
    ...FONTSIZE.secondary_small,
    color: COLORS.black,
    flexDirection: "column",
    backgroundColor: COLORS.neutral_min
  },
  productCarte_fullDescription_text:{
    ...FONTSIZE.normal,
    lineHeight: 15,
    marginTop: 20,
    color: COLORS.black,
    alignSelf: "flex-start"
  },
  productCarte_fullDescription_closeIcon:{
    position: "absolute",
    right: 18,
    top: 4
  },
  productCarte_allergens_Description:{
    marginTop: 5,
    marginBottom: 24
  },
  allergens_list:{
    flexDirection: "column",
    width: "100%"
  },
  allergens_list_allergen:{
    textTransform: "uppercase",
    color: COLORS.main,
    ...FONTSIZE.medium,
    marginRight: 4,
  },
  allergens_list_closeButton:{
    ...FONTSIZE.secondary_small,
    lineHeight: 19,
    position: "absolute",
    right: 24,
    bottom: 32
  },
  allergen_row:{
    flexDirection: "row",
    marginTop: 8,
    height: 28,
    backgroundColor: COLORS.main_terciary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    lineHeight: 18,
    alignSelf: "flex-start"
  },
  no_products_hint:{
    ...FONTSIZE.secondary_small,
    lineHeight: 19,
    color: COLORS.black,
    marginVertical: 24,
    textAlign: "center"
  },
  no_products_for_filters:{
    ...FONTSIZE.secondary_small,
    textAlign: "center",
    marginTop:50
  }
});
