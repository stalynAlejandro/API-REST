import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { BasicButtonComponent } from 'components'
import styles from './FilterModalComponent.style'
import CheckBoxOn from 'assets/svg/checkbox/checkBoxOn.svg'
import CheckBoxOff from 'assets/svg/checkbox/checkBoxOff.svg'

const SelectedOptions = ({ title, setList }) => {
    return (
        <View style={styles.selectedOptions}>
            <Text style={styles.mainTextActive}>{title}</Text>
            <View style={styles.selectedTextContainer}>
                {(setList.some(l => l[1] !== 0)) ?
                    setList.map((l) => <Text style={styles.selectedText}>{(l[1] === 1) ? `${l[0]}, ` : ''}</Text>)
                    :
                    <Text style={styles.selectedText}>Todos</Text>
                }
            </View>
        </View>
    )
}

const MenuModal = ({ title, setList, render }) => {

    const selectOption = (item) => setList[setList.findIndex(i => i[0] === item[0])] = (item[1] === 0) ? [item[0], 1] : [item[0], 0]
    
    return (
        <View style={styles.menuModal}>
            <SelectedOptions title={title} setList={setList} />
            <ScrollView style={styles.scrollOptions}>
                {setList.map((item) => {
                    return (
                        <TouchableOpacity style={styles.optionContainer} onPress={x => selectOption(item)} onPressOut={render}>
                            <Text style={styles.mainText}>{item[0]}</Text>
                            {(item[1] === 1 ? <CheckBoxOn style={styles.checkBox} /> : <CheckBoxOff style={styles.checkBox} />)}
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export const FilterModalComponent = ({ title, setList, toggleModal }) => {

    const pressClose = () => toggleModal(false)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.outArea} onPress={pressClose}></TouchableOpacity>
            <MenuModal title={title} setList={setList} render={toggleModal}/>
            <BasicButtonComponent text={"Aplicar"} isActive={true} onPress={pressClose} />
        </View>
    )
}
