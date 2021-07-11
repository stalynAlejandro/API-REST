import { StyleSheet } from 'react-native';
import { FONTSIZE, COLORS } from 'constants'

export default StyleSheet.create({
    background:{
        position: 'absolute',
        top: -10,
        left: 0
      },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.neutral_min,
        padding: 20,
        height: '100%'
    },
    welcomeContainer: {
        padding: 20,
    },
    title: {
        ...FONTSIZE.main_large,
        color: COLORS.indigo,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },
    paragraph: {
        ...FONTSIZE.secondary_small,
        color: COLORS.indigo,
        textAlign: 'justify',
    },
    buttonContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 100,
        width: '95%',
        bottom: 50,
    },
    button: {
        height: '40%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.indigo,
        backgroundColor: COLORS.white,
    },
    buttonText: {
        color: COLORS.indigo,
        paddingHorizontal: 20
    }
})