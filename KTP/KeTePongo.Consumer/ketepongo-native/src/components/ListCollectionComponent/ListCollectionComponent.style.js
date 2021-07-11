import { StyleSheet } from 'react-native'
import { COLORS, FontSize } from 'constants'
import { FONTSIZE } from 'constants'
import { TYPOGRAPHY } from 'constants'

const itemContainer = {
    display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 50,
        width: '100%',
}

export default StyleSheet.create({
    whiteContainer: {
        ...itemContainer,
        backgroundColor: COLORS.white
    },
    blueContainer:{
        ...itemContainer,
        backgroundColor: COLORS.lightBlue
    },
    grayContainer:{
        ...itemContainer,
        backgroundColor: COLORS.supLightGray
    },
    itemName:{
        paddingLeft: 20,
        ...FONTSIZE.secondary,
        ...TYPOGRAPHY.nunito_regular
    },
    pendingItemName:{
        paddingLeft: 20,
        ...FONTSIZE.secondary,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.lightGray
    },
    editIcon:{
        position:'absolute',
        right: 20,
    }

})