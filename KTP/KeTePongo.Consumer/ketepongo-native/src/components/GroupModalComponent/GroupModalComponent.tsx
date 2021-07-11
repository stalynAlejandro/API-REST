import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './GroupModalComponent.style'
import RadioButtonOn from 'assets/svg/buttons/radioButtonOn.svg'
import RadioButtonOff from 'assets/svg/buttons/radioButtonOff.svg'

const Option = ({ option, selected, onClose, pressOption }) => {

    const selectOption = () => {
        pressOption(option)
        onClose()
    }

    return (
        <TouchableOpacity style={styles.optionContainer} onPress={selectOption}>
            <Text style={styles.mainText}>{option}</Text>
            {(option === selected) ? <RadioButtonOn style={styles.radioButton} /> : <RadioButtonOff style={styles.radioButton} />}
        </TouchableOpacity>
    )
}

const SelectedOptions = ({ selected }) => {
    return (
        <View style={styles.selectedOptions}>
            <Text style={styles.mainTextActive}>Agrupar por:</Text>
            <Text style={styles.selectedText}>{selected}</Text>
        </View>
    )
}

const MenuModal = ({ options, selected, onClose, pressOption }) => {

    return (
        <View style={styles.menuModal}>
            <SelectedOptions selected={selected} />
            {options.map((op: string) => <Option option={op} selected={selected} onClose={onClose} pressOption={pressOption} />)}
        </View>
    )
}


export const GroupModalComponent = ({ groups, selected, onClose, onPressOption }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.outArea} onPress={onClose}></TouchableOpacity>
            <MenuModal options={groups} selected={selected} onClose={onClose} pressOption={onPressOption} />
        </View>
    )
}
