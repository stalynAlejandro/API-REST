import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE } from 'constants'

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
    logo: {
        position: 'absolute',
        left: 20,
    },
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    iconWithText: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
        position:'relative'
    },
    burger: {
        position: 'absolute',
        left: 10,
    },
    notificationDot: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
        position: 'absolute'
      },
      text: {
        ...FONTSIZE.extra_super_small,
        color: COLORS.white,
        textAlign: 'center',
        marginLeft:20,
        marginTop:3,
        position:'absolute'
      },
      cartContainer: {
        position:'relative',
      },
});