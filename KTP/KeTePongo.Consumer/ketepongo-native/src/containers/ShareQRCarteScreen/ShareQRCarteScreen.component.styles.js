import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTSIZE, SIZE, LAYOUT } from "constants";

export default StyleSheet.create({
  container: {
    justifyContent:"space-between",
    flex:1,
    backgroundColor: COLORS.neutral_min
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1,
  },
  qr_image: {
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center",
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    width:300,
    height:300,
  },
 
  share_button:{
    marginBottom: 16,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
  share_button_text:{
    color: COLORS.main,
    ...FONTSIZE.secondary_large,
    lineHeight: 22, 
    marginLeft:10
  },
  main_container:{
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems: "stretch",
    flex:1,
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    flex:1
  },
  A4_icon:{
    alignSelf:'center',
  },
  share_item:{
    flexDirection:"column",
    justifyContent: "space-between",
    alignContent:'space-between',
    width:'48%',
  },
  share_item_title:{
    color:COLORS.neutral_super_strong,
    ...FONTSIZE.secondary_small,
    marginVertical:8
  },
  share_button_container:{
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:"center"
  }
});
