import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import IconPencil from 'assets/svg/buttons/pencil.svg'
import IconConnect from 'assets/svg/buttons/connect.svg'
import IconPending from 'assets/svg/info/Warn.svg'
import styles from './ListCollectionComponent.style'

const PendingItem = ({ name }: any) => {
    return (
        <View style={styles.grayContainer}>
            <Text style={styles.pendingItemName}>{name}</Text>
            <TouchableOpacity style={styles.editIcon}>
                <IconPending />
            </TouchableOpacity>
        </View >
    )
}

const Item = ({ name, index, selectedItem, pressEdit }: any) => {
    const selectItem = (name: string) => {
        selectedItem(name)
        pressEdit()
    }

    return (
        <View style={(index % 2) ? styles.whiteContainer : styles.blueContainer}>
            <IconConnect />
            <Text style={styles.itemName}>{name}</Text>
            <TouchableOpacity style={styles.editIcon} onPress={() => selectItem(name)}>
                <IconPencil />
            </TouchableOpacity>
        </View>
    )
}

export const ListCollectionComponent = ({ collection, selectedItem, onPressEdit, collectionPending }: any) => {
    return (
        <ScrollView>
            {collection.map((name, index) => <Item name={name} index={index} selectedItem={selectedItem} pressEdit={onPressEdit} />)}
            {(collectionPending) && collectionPending.map((name) => <PendingItem name={name} />)}
        </ScrollView>
    )
}