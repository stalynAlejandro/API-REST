import { StyleSheet } from 'react-native'
import { COLORS, TYPOGRAPHY } from 'constants'

const containerOption = {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center'
}

export default StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        height: '120%',
        width: '100%',
    },
    outArea: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.transparentGray
    },
    menuArea: {
        position: 'absolute',
        right: 0,
        height: 420,
        width: 250,
        backgroundColor: COLORS.main_background
    },
    containerOption: {
        ...containerOption,
    },
    containerOptionYellow: {
        ...containerOption,
        backgroundColor: COLORS.lightYellow
    },
    text: {
        marginLeft: 20,
        marginTop: 10,
        height: 40,
        ...TYPOGRAPHY.nunito_regular
    },
    notificationDot: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
        position: 'absolute'
      },
    notificationIcon: {
        width: 25,
        height: 15,
    }
})