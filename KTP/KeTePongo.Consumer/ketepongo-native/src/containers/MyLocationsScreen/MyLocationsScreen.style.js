import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE } from 'constants'
import { TYPOGRAPHY } from 'constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    modal: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    modalOutSide: {
        height: '10%',
        width: '100%',
        backgroundColor: COLORS.transparentGray
    },
    modalMenu: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '90%',
        borderRadius: 3,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white
    },
    modalTitle: {
        ...TYPOGRAPHY.nunito_bold,
        ...FONTSIZE.secondary_large,
        color: COLORS.indigo,
    },
    modalSubTitle: {
        ...FONTSIZE.normal,
    },
    modalBody: {
        height: '25%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
    },
    errorMessage: {
        ...FONTSIZE.small,
        color: COLORS.red_alert
    },
    line: {
        width: '100%',
        height: 1,
        borderRadius: 5,
        bottom: 10,
        backgroundColor: COLORS.black,
    },
    active: {
        color: COLORS.indigo,
        ...FONTSIZE.main,
        fontWeight: '900'
    },
    inactive: {
        color: COLORS.lightGray,
        ...FONTSIZE.main,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttonText: {
        color: COLORS.indigo,
        ...FONTSIZE.secondary
    },
    buttonRight: {
        alignSelf: 'flex-end',
        margin: 20
    }
})