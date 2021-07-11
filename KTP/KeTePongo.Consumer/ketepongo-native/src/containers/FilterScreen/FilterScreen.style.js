import { StyleSheet } from 'react-native'
import { COLORS } from 'constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    selectContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        top: 110,
        marginHorizontal: 20,
        marginTop: 20,
        height: 70,
        width: '90%',
    },
    listSelected: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        maxWidth: '100%',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: COLORS.indigo,
        backgroundColor: COLORS.white,
    },
    textTitle: {
        color: COLORS.indigo,
    },
    textSelected: {
        left: 10,
        color: COLORS.gray,        
    },
})