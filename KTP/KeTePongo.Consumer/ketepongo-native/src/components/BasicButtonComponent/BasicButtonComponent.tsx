import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styles from './BasicButtonComponent.style'

export const BasicButtonComponent = ({ text, isActive, onPress }: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onPress()} style={(isActive) ? styles.buttonActive : styles.buttonInactive}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
