import React from 'react'
import { View, TouchableOpacity, TextInput } from 'react-native'
import { COLORS } from 'constants'
import styles from './SearchComponent.style'
import IconSearch from 'assets/svg/buttons/search.svg'
import IconClose from 'assets/svg/x/xGray.svg'
import IconFilter from 'assets/svg/buttons/buttonFilter.svg'


const OptionFilter = ({ pressGoToFilter }) => {
    return (
        <TouchableOpacity onPress={pressGoToFilter} style={styles.area}>
            <IconFilter style={styles.icon} />
        </TouchableOpacity>
    )
}

const OptionClose = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.area} onPress={onPress}>
            <IconClose style={styles.icon} />
        </TouchableOpacity>
    )
}

export const SearchComponent = ({ onClose, searchByWord, pressGoToFilter, placeholderText }) => {

    return (
        <View style={styles.container}>
            <IconSearch style={{ ...styles.icon, ...styles.searchIcon }} />
            <TextInput onChangeText={text => searchByWord(text)} style={styles.input} autoFocus={true} maxLength={20} placeholder={placeholderText} placeholderTextColor={COLORS.indigo} />
            <OptionFilter pressGoToFilter={pressGoToFilter} />
            <OptionClose onPress={onClose} />
        </View>
    )
}