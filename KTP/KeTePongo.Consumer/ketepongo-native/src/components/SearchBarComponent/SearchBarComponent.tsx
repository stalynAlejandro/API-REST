import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import IconBack from 'assets/svg/arrows/arrowBack.svg'
import IconSearch from 'assets/svg/buttons/search.svg'
import IconClose from 'assets/svg/x/xBlack.svg'
import { COLORS } from 'constants'
import styles from './SearchBarComponent.style'

const OptionClose = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.search} onPress={onPress}>
            <IconClose style={styles.icon} />
        </TouchableOpacity>
    )
}

const OptionGoBack = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.arrowBack} onPress={onPress}>
            <IconBack style={styles.icon} />
        </TouchableOpacity>
    )
}

const OptionSearch = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.search} onPress={onPress}>
            <IconSearch style={styles.icon} />
        </TouchableOpacity>
    )
}

export const SearchBarComponent = ({ placeHolder, goBack, searchByWord, onClose }) => {

    const [inputMode, setInputMode] = useState(false)
    const onToggleInputMode = () => {
        setInputMode(!inputMode)
        onClose()
    }

    return (
        <View style={styles.container}>
            {inputMode && <TextInput onChangeText={text => searchByWord(text)} style={styles.input} autoFocus={true} maxLength={20} placeholder={placeHolder} placeholderTextColor={COLORS.indigo} />}
            {(inputMode) ? <OptionClose onPress={onToggleInputMode} /> : <OptionSearch onPress={onToggleInputMode} />}
            <OptionGoBack onPress={goBack} />
        </View>
    )
}
