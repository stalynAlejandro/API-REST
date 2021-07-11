import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT } from 'constants';

export default StyleSheet.create({
    drag_header_container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,

        ...Platform.select({
            android: {
                marginBottom: -1.5,
            },
        }), 
        backgroundColor: COLORS.neutral_min

    },
    tabsContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        width: '100%',
        backgroundColor: COLORS.neutral_min
    },
    tabBarItem: {
        width: '50%',
        ...Platform.select({
            ios: {
                height: LAYOUT.WINDOW.height > 700 ? 40 : 45,
            }
        }),
        backgroundColor: COLORS.neutral_min
    },
    drag_subtext: {
        alignSelf: 'center',
        ...FONTSIZE.medium,
        color: COLORS.neutral_super_strong,
        ...Platform.select({
            ios: {
                height: LAYOUT.WINDOW.height > 700 ? 18 : 50,
            }
        }),
        backgroundColor: COLORS.neutral_min,
        marginHorizontal:20
    },
    active: {
        borderBottomWidth: 3,
        borderColor: COLORS.main,
        backgroundColor: COLORS.neutral_min
    },
    inactive: {
        borderBottomWidth: 3,
        borderColor: 'white',
        backgroundColor: COLORS.neutral_min
    },
    tab_title_inactive: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: COLORS.neutral_min
    },
    tab_title_active: {
        textAlign: 'center',
        fontWeight: '700',
        color: COLORS.main,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: COLORS.neutral_min
    }
});