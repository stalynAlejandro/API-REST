import { StyleSheet } from 'react-native'

const OptionContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 40,
    width: '50%',
    height: '90%',
}

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '8%',
        backgroundColor: '#381a56',
        position: 'absolute',
        bottom: 0
    },
    optionLeftActive: {
        ...OptionContainer,
        backgroundColor: '#dcd6ee',
    },
    optionLeftInactive: {
        ...OptionContainer,
        height: '100%',
        backgroundColor: '#f9f8ff',

    },
    optionRightActive: {
        ...OptionContainer,
        backgroundColor: '#dcd6ee',
    },
    optionRightInactive: {
        ...OptionContainer,
        height: '100%',
        backgroundColor: '#f9f8ff',
    },
    textActive: {
        color: '#381a56',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInactive: {
        color: '#7f7f7f',
        fontSize: 16,

    },
})