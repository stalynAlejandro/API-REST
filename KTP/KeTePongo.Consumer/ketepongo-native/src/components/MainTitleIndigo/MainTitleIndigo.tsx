import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants'

interface IMainTitleIndigo {
    title: string
}

function MainTitleIndigo(args: IMainTitleIndigo) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{args.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    title: {
        color: COLORS.indigo,
        ...FONTSIZE.main,
        ...TYPOGRAPHY.nunito_bold
    }
})

export { MainTitleIndigo }