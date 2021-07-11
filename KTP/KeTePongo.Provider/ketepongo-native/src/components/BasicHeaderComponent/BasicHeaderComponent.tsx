import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ArrowBack from '../../../assets/arrows/back_main.svg'
import styles from './BasicHeaderComponent.style'

export const BasicHeaderComponent = ({ onPress, title }) => {
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
