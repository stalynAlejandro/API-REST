import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants'

export default StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.transparentGray
    },
    outArea: {
        position: 'absolute',
        width: '100%',
        height: '40%',
    },
    menuModal: {
        position: 'absolute',
        width: '100%',
        height: '60%',
        bottom: 0,
        backgroundColor: COLORS.white,
        borderRadius: 5,
    },
    selectedOptions: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        left: 20,
        height: 70,
        width: '100%',

    },
    selectedTextContainer:{
        display:'flex',
        flexDirection:'row',
    },
    optionContainer: {
        left: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
    },
    scrollOptions:{
        marginBottom: 100,
    },
    mainText: {
        ...FONTSIZE.secondary,
        color: COLORS.indigo,
    },
    mainTextActive: {
        ...FONTSIZE.secondary,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.indigo,
    },
    selectedText: {
        color: COLORS.salmon,
    },
    checkBox:{
        position: 'absolute',
        alignSelf: 'center',
        right: 50,
    }

})