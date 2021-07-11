import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: "#f5f1ff",
        height: 60,
        width: "100%",
    },
    area: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    searchIcon: {
        position: 'absolute',
        left: 10
    },
    input: {
        position: 'absolute',
        left: 60,
    },
    search: {
        position: 'absolute',
        left: 10
    },
})