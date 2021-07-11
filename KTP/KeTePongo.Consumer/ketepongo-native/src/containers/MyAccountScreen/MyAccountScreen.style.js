import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE, TYPOGRAPHY, SIZE } from 'constants'

export default StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.white
    },
    componentData: {
        display: 'flex',
        height: 80,
        justifyContent: 'space-evenly',
        width: '90%',
        flexDirection: 'column',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: COLORS.indigo,
    },
    text: {
        textAlign: 'justify',
        marginLeft: 2,
        color: COLORS.indigo,
        ...TYPOGRAPHY.nunito,
        ...FONTSIZE.secondary
    },
    change_password_wrapper: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20
    },
    icon: {
        marginRight: 14,
    },
    change_password: {
        color: COLORS.secondary,
        ...FONTSIZE.secondary_small
    },
    lock_wrapper: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 80,
        alignItems: 'center',
    },
    icon_size: {
        ...SIZE.square_30
    },
    close_account: {
        color: COLORS.lightGray,
        ...FONTSIZE.secondary_small
    },
    modal: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        height: 650,
        width: '100%',
    },
    modalOutside: {
        height: '10%',
        width: '100%',
        backgroundColor: COLORS.transparentGray
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
        borderColor: COLORS.white,
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
    },
    modalTitle: {
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.indigo,
        paddingVertical: 10
    },
    button: {
        position: 'absolute',
        right: 10,
        top: 250,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    buttonText: {
        color: COLORS.indigo,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold
    },
    textInputStyle: {
        borderBottomColor: COLORS.indigo,
        borderBottomWidth: 1,
        paddingBottom: 1,
        color: COLORS.indigo,
        ...TYPOGRAPHY.nunito_bold,
        ...FONTSIZE.secondary
    },
    infoText: {
        color: COLORS.lightGray,
        ...TYPOGRAPHY.nunito_italic,
        ...FONTSIZE.normal
    },
    errorMessage: {
        ...FONTSIZE.small,
        color: COLORS.red_alert,
        paddingVertical: 10,
    },
    textInput: {
        borderBottomColor: COLORS.indigo,
        borderBottomWidth: 1,
        paddingBottom: 0,
        textAlign: 'center'
    },
    dialogContainer: {
        position: 'absolute',
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '120%',
        backgroundColor: COLORS.transparentGray
    },
    dialogBox: {
        height: 250,
        width: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 6,
        marginTop: 100,
        paddingHorizontal: 10,
    },
    dialogText: {
        textAlign: 'center',
        marginTop: 20,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_regular
    },
    dialogInfoText: {
        ...FONTSIZE.small,
        ...TYPOGRAPHY.nunito_italic,
        color: COLORS.lightGray,
        paddingTop: 10,
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
    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    phonecode: {
        display: 'flex',
        height: 80,
        justifyContent: 'space-evenly',
        width: '90%',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10
    },
    picker: {
        width: 125,
        height: 50,
        color: COLORS.indigo,
    },
})