import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize: 20,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        marginHorizontal: 40,
        marginVertical: 20,
    },
    button: {
        marginHorizontal: 40,
        marginTop: 20,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
