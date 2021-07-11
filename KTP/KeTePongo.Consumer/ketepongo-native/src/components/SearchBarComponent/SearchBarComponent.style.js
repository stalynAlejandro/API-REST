import { StyleSheet } from 'react-native'
import { COLORS } from 'constants'

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: COLORS.lightYellow,
        height: 60,
        width: "100%",
    },
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    search: {
        position: 'absolute',
        right: 10,
    },
    arrowBack: {
        position: 'absolute',
        left: 10,
    },
    input: {
        position: 'absolute',
        left: 60
    }

})