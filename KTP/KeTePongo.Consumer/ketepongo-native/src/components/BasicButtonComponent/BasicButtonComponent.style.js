import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants'

const button = {
    height: 45,
    width: 370,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
}

export default StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: 580,
    },
    buttonActive: {
        ...button,
        backgroundColor: COLORS.indigo,
    },
    buttonInactive: {
        ...button,
        backgroundColor: COLORS.lightGray,
    },
    text: {
        color: COLORS.white,
        ...FONTSIZE.secondary_large,
    }
})