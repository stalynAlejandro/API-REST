import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE } from 'constants'

export default StyleSheet.create({
    container: {
        height: '67%',
    },
    filters: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        width: '100%',
    },
    tag: {
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.supLightGray,
        marginHorizontal: 10,
    },
    text: {
        marginHorizontal: 5,
        marginVertical: 1,
        ...FONTSIZE.normal
    }

})