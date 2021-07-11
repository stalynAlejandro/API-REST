import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants'

export default StyleSheet.create({
    tabNavigator: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: COLORS.main_background,
        paddingVertical: 10,
    },
    optionGroup:{
        display: 'flex', 
        flexDirection: 'row', 
        backgroundColor: COLORS.white,
        alignContent:'center',
        paddingLeft: 10
    },
    icon:{
        paddingTop: 10,
    },
    option: {
        paddingHorizontal: 15,
        ...FONTSIZE.tertiary,
    },
    optionSelected: {
        paddingHorizontal: 15,
        ...FONTSIZE.tertiary,
        color: COLORS.indigo,
        ...TYPOGRAPHY.nunito_bold,
    },
    lineSelected: {
        width: '80%',
        height: 2,
        borderRadius: 5,
        alignSelf: 'center',
        backgroundColor: COLORS.indigo,
    },

})