import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './MiddleButtonComponent.style'

export const MiddleButtonComponent = ({ icon, title, color, pressButton }) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={pressButton}>
                {icon}
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}