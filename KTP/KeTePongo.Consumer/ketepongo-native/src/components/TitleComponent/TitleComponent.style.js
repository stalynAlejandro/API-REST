import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants'


export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.main_background,
        justifyContent:'center',
        alignItems:'center',
        height: 70,
        width: '100%',
    },
    title: {
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold
    }
})