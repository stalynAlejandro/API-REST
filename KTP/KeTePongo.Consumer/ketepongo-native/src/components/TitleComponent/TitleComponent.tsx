import React from 'react'
import { View, Text } from 'react-native'
import styles from './TitleComponent.style'

export const TitleComponent = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}
