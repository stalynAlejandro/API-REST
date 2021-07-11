import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './FilterScreen.style'

export const SelectFromList = ({ title, list, onPress }) => {
    const onPressShowModal = () => onPress(true)

    return (
        <View style={styles.selectContainer}>
            <Text style={styles.textTitle}>{title}</Text>
            <TouchableOpacity onPress={onPressShowModal}>
                <View style={styles.listSelected}>
                    {(list.filter(l => l[1] !== 0).length !== 0) ?
                        list.map((l) => <Text style={styles.textSelected}>{(l[1] === 1) ? `${l[0]}, ` : ''}</Text>)
                        :
                        <Text style={styles.textSelected}>Todos</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}
