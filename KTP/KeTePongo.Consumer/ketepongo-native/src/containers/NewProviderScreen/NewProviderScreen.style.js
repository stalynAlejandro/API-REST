import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE } from 'constants'
import { TYPOGRAPHY } from 'constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 100,
        height: '50%',
    },
    option: {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: COLORS.lightIndigo,
        backgroundColor: COLORS.lightBlue,
    },
    line: {
        width: '100%',
        height: 1,
        borderRadius: 5,
        bottom: 10,
        backgroundColor: COLORS.black,
    },
    modal: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        height: 500,
        width: '100%',
    },
    modalTitle: {
        ...FONTSIZE.secondary_large,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.indigo,
    },
    modalBody: {
        height: '25%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
    },
    modalSubTitle: {
        ...FONTSIZE.normal,
        color: COLORS.lightGray,
        ...TYPOGRAPHY.nunito_regular,
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
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
    },
    button: {
        position: 'absolute',
        right: 10,
        top: 250,
        display: 'flex',
        flexDirection: 'row'
    },
    buttonText: {
        color: COLORS.indigo,
        ...FONTSIZE.secondary
    },
    active: {
        color: COLORS.indigo,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold
    },
    inactive: {
        color: COLORS.lightGray,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_regular
    },
    errorMessage: {
        ...FONTSIZE.small,
        color: COLORS.red_alert,
    },
    phonecode: {
        display: 'flex',
        flexDirection: 'row',
    },
    picker: {
        width: 125,
        height: 50,
        color: COLORS.indigo,
    },
    dialogProvider: {
        position: 'absolute',
        zIndex: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingBottom: 40,
        backgroundColor: COLORS.transparentGray
    },
    dialogBox: {
        height: '30%',
        width: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 6,
    },
    dialogText: {
        textAlign: 'center',
        marginTop: 20,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_regular
    },
    dialogButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    dialogCancel: {
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.lightGray
    },
    dialogAdd: {
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.indigo
    },
    dialogErroText: {
        textAlign: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold
    }
})