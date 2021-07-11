import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { addLocationRequested, updateLocationRequested, deleteLocationRequested } from '../../store/consumption/locations/operations'
import { COLORS } from 'constants'
import ArrowIconActive from 'assets/svg/arrows/chevronActive.svg'
import ArrowIconInactive from 'assets/svg/arrows/chevronInactive.svg'
import styles from './MyLocationsScreen.style'

export const ModalEditLocation = ({ title, toggleModal, selectedItem }) => {

    const dispatch = useDispatch()
    const store = useSelector(state => state.buying);
    
    const [newName, setNewName] = useState(selectedItem)

    const pressOut = () => toggleModal()

    const deleteLocation = () => {
        const id: number = store.locations.list.find((l) => l.name === newName).id
        dispatch(deleteLocationRequested(id))
        toggleModal()
    }

    const changeLocation = () => {
        const currentLocation = store.locations.list.find((l) => l.name === selectedItem).id

        const updateLocation = {
            ...currentLocation,
            name: newName
        }

        dispatch(updateLocationRequested(updateLocation))
        toggleModal()
    }

    return (
        <View style={styles.modal}>
            <TouchableOpacity style={styles.modalOutSide} onPress={pressOut} />
            <View style={styles.modalMenu}>

                <Text style={styles.modalTitle}>{title}</Text>

                <View style={styles.modalBody}>
                    <TextInput onChangeText={text => setNewName(text)} value={newName} autoFocus={true} maxLength={30} placeholder={"Escribe el nombre de la ubicación"} placeholderTextColor={COLORS.lightGray} />
                    <View style={styles.line}></View>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={deleteLocation}>
                        <Text style={styles.inactive} >Eliminar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={changeLocation}>
                        <Text style={(!(newName === selectedItem)) ? styles.active : styles.inactive}>Continuar</Text>
                        {(!(newName === selectedItem)) ? <ArrowIconActive /> : <ArrowIconInactive />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}



export const ModalNewLocation = ({ title, toggleModal }) => {

    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const pressOut = () => toggleModal()
    const newLocation = () => {
        dispatch(addLocationRequested(name))
        toggleModal()
    }

    return (
        <View style={styles.modal}>
            <TouchableOpacity style={styles.modalOutSide} onPress={pressOut} />
            <View style={styles.modalMenu}>

                <Text style={styles.modalTitle}>{title}</Text>

                <View style={styles.modalBody}>
                    <TextInput onChangeText={text => setName(text)} autoFocus={true} maxLength={30} placeholder={"Escribe el nombre de la ubicación"} placeholderTextColor={COLORS.lightGray} />
                    <View style={styles.line}></View>
                </View>

                <TouchableOpacity style={styles.buttonRight} onPress={newLocation}>
                    <Text style={(name.length > 0) ? styles.active : styles.inactive}>Añadir</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

