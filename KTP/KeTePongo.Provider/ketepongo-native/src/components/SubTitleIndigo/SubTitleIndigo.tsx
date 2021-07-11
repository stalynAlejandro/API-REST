import { COLORS, FONTSIZE, TYPOGRAPHY } from 'constants'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface ISubtitleTitleIndigo {
    title: string
}

function SubTitleIndigo(args: ISubtitleTitleIndigo) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{args.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        left: 0,
    },
    title: {
        color: COLORS.indigo,
        ...FONTSIZE.secondary,
        ...TYPOGRAPHY.nunito_bold
    }
})

export { SubTitleIndigo }