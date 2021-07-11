import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE } from 'constants'
import { TYPOGRAPHY } from 'constants'

export default StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        height: '400%',
        width: '100%',
        backgroundColor: COLORS.transparentGray
    },
    outArea: {
        height: '60%',
        width: '100%',
    },
    menuModal: {
        position: 'absolute',
        top: 380,
        height: '40%',
        width: '100%',
        backgroundColor: COLORS.main_background
    },
    selectedOptions: {
        left: 20,
        height: 70,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    optionContainer: {
        left: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
    },
    mainText: {
        ...FONTSIZE.secondary,
        ...TYPOGRAPHY.nunito_regular,
        color: COLORS.indigo,
    },
    mainTextActive: {
        ...FONTSIZE.secondary,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.indigo,
    },
    radioButton: {
        position: 'absolute',
        alignSelf: 'center',
        right: 50,
    },
    selectedText: {
        color: COLORS.salmon,
    },
})