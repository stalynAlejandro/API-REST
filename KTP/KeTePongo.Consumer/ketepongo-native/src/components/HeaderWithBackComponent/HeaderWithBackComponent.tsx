import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ArrowBack from 'assets/svg/arrows/arrowBack.svg'
import styles from './HeaderWithBackComponent.style'

export const HeaderWithBackComponent = ({ title, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={onPress}>
                <ArrowBack style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.line}></View>
        </View>
    )
}
