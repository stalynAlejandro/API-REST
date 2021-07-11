import { StyleSheet } from 'react-native'
import { COLORS, SIZE, FONTSIZE } from 'constants'

export default StyleSheet.create({
    out_container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingRight:60,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.lightYellow,
    },
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
    arrow: {
        ...SIZE.square_25,
    },
    burger: {
        position: 'absolute',
        left: 10,
    },
    iconWithText: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
        position:'relative'
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