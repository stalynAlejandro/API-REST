import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE } from 'constants'
import { TYPOGRAPHY } from 'constants'

export default StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        marginTop: '110%',
    },
    button: {
        height: 40,
        width: 150,
        borderRadius: 8,
        backgroundColor: COLORS.indigo,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    text: {
        alignSelf: 'center',
        alignItems: 'center',
        color: COLORS.white,
        ...FONTSIZE.secondary,
        ...TYPOGRAPHY.nunito_regular
    }
})