import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE } from 'constants'

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 110,
        width: '100%',
        backgroundColor: COLORS.white,
        marginTop: 2,
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 15,
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    bodyLocations: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    buttons:{
        display:'flex',
        flexDirection:'row',
    },
    name:{
        ...FONTSIZE.secondary,
    },
    locations:{
        ...FONTSIZE.medium,
        color:COLORS.gray
    },
    price:{
        color:COLORS.indigo,
        fontWeight:'bold',
    },
    number:{
        marginHorizontal:10,
        ...FONTSIZE.max_super,
        fontWeight:'bold',
    }
})