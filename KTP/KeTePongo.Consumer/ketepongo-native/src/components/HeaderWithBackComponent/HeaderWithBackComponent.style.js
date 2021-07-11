import { StyleSheet } from 'react-native'
import { COLORS, FONTSIZE, SIZE, TYPOGRAPHY } from 'constants'

export default StyleSheet.create({
    out_container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        ...SIZE.square_25,
    },
    icon: {
        position: 'absolute',
        left: 20,
    },
    title: {
        position: 'absolute',
        ...FONTSIZE.main_large,
        ...TYPOGRAPHY.nunito_bold,
        display:'flex',
        alignItems: 'center'
    },
    line: {
        position:'absolute',
        bottom: 0,
        height: 1,
        width: '100%',
        backgroundColor: COLORS.supLightGray
    }
})