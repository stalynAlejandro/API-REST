import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE } from 'constants'

const rowContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

const columnContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}

export default StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        top: -180,
        height: '400%',
        width: '100%',
        backgroundColor: COLORS.transparentGray,
    },
    rowContainer: {
        ...rowContainer,
    },
    columnContainer: {
        ...columnContainer,
    },
    outsideArea: {
        height: '60%',
        width: '100%',
    },
    insideArea: {
        position: 'absolute',
        height: '90%',
        width: '100%',
        bottom: 0,
        borderRadius: 3,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
    },
    titleModal: {
        ...FONTSIZE.secondary,
        fontWeight: '700',
        color: COLORS.indigo,
    },
    subTitleModal: {
        ...FONTSIZE.normal,
        fontStyle: 'italic',
        color: COLORS.indigo,
    },
    infoText: {
        ...FONTSIZE.extra_small,
        fontStyle: 'italic',
        color: COLORS.lightGray,
    },
    line: {
        width: '100%',
        height: 1,
        borderRadius: 5,
        backgroundColor: COLORS.indigo,
        bottom: 10,
    },
    finishButton: {
        height: 40,
        position: 'relative',
        alignItems: 'center',
    },
    continueButton: {
        ...rowContainer,
        marginLeft: 270,
        marginTop: 100,
    },
    finishText: {
        color: COLORS.lightGray,
        ...FONTSIZE.secondary,
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
    productContainer: {
        ...rowContainer,
        marginTop: 20,
    },
    locationContainer: {
        ...rowContainer,
        alignItems: 'center',
        height: 42,
        width: '100%',
        backgroundColor: COLORS.white,
        top: 0,
    },
    locationContainerSelected: {
        ...rowContainer,
        alignItems: 'center',
        height: 42,
        width: '100%',
        backgroundColor: COLORS.lightBlue,
        top: 0,
    },
    checkBox: {
        width: 30,
        height: 30,
    },
    locationsLine: {
        width: '100%',
        backgroundColor: COLORS.gray,
        paddingVertical: 0.8,
    },
    locationsText: {
        color: COLORS.indigo,
        ...FONTSIZE.secondary,
    },
})