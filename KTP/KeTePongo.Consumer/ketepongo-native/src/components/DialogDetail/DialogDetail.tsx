import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants'

export const DialogDetail = ({ message, onPressOk }: any) => {
    return (
        <View style={styles.dialogContainer}>
            <View style={styles.dialogBox}>
                <Text style={styles.dialogErroText}>{message}</Text>
                <View style={styles.dialogButtons} >
                    <TouchableOpacity onPress={onPressOk}>
                        <Text style={styles.dialogAdd}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dialogContainer: {
        position: 'absolute',
        zIndex: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 150,
        backgroundColor: COLORS.transparentGray
    },
    dialogBox: {
        height: 200,
        width: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 6,
    },
    dialogText: {
        textAlign: 'center',
        marginTop: 20,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_regular
    },
    dialogButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    dialogCancel: {
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.lightGray
    },
    dialogAdd: {
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold,
        color: COLORS.indigo
    },
    dialogErroText: {
        textAlign: 'center',
        paddingTop: 30,
        paddingHorizontal: 20,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold
    }
})