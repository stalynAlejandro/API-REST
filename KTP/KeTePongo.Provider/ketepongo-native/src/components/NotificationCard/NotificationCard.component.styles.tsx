import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT, HEIGHT } from 'constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
cardContainer: {
  marginHorizontal: 16,
  marginBottom: 16,
  backgroundColor: COLORS.neutral_min,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: COLORS.sky_light,
},
cardContent: {
  alignItems: 'center',
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  paddingVertical: 14
},
cardLeftBorderPositive: {
  borderLeftWidth: 4,
  paddingLeft: 27,
  borderRadius: 5,
  borderColor: COLORS.green,
},
cardLeftBorderNegative: {
  borderLeftWidth: 4,
  paddingLeft: 27,
  borderRadius: 5,
  borderColor: COLORS.red_alert
},
cardInfo: {
  borderLeftWidth: 2,
  paddingLeft: 8,
  marginLeft: 27,
  marginRight: 10,
  flex: 1,
  borderColor: COLORS.sky_light,
  display: 'flex',
  flexDirection: 'column'
},
cardIcon: {
  height: 28,
  width: 21,
  transform: [{ scale: 1.3 }]
},
cardTitle: {
  marginBottom: 8,
  ...FONTSIZE.secondary_small,
  color: COLORS.grey_super_dark,
},
cardDescription: {
  marginBottom: 8,
  ...FONTSIZE.normal,
  color: COLORS.neutral_strong,
},
cardContainerRead: {
  marginHorizontal: 16,
  marginBottom: 16,
  backgroundColor: COLORS.neutral_superlight,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: COLORS.sky_light,
},
cardContentRead: {
  alignItems: 'center',
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  paddingVertical: 14
},
cardLeftBorderRead: {
  paddingLeft: 31,
  borderRadius: 5,
},
cardInfoRead: {
  borderLeftWidth: 2,
  paddingLeft: 8,
  marginLeft: 27,
  marginRight: 10,
  flex: 1,
  borderColor: COLORS.neutral_medium,
  display: 'flex',
  flexDirection: 'column'
},
cardIconRead: {
  height: 28,
  width: 21,
  transform: [{ scale: 1.3 }],
  opacity: 0.5
},
cardTitleRead: {
  marginBottom: 8,
  ...FONTSIZE.secondary_small,
  color: COLORS.neutral_strong,
},
cardDescriptionRead: {
  marginBottom: 8,
  ...FONTSIZE.normal,
  color: COLORS.neutral_strong,
},
});