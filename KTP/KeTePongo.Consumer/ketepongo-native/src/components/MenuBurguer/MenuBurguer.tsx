import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { ConsumerType } from '../../model/DTOs/Consumer/ConsumerType'
import { MenuIconNotifications, MenuIconAccount, MenuIconLocations, MenuIconOrders, MenuIconProviders, MenuIconCommerce, MenuIconAddress, MenuIconCloseSession } from './MenuBurguer.UI'
import IconCloseSession from 'assets/svg/info/exit.svg'
import styles from './MenuBurguer.style'
import { ROUTES } from 'constants'

const MenuOption = ({ option, index, onClose, onPress, openDialog }: any) => {
    const onPressOption = () => {
        let navigate = option[1]
        onClose()
        if (option[1].trim() === 'Cerrar Sesión') {
            openDialog()
        }
        if (option[1].trim() === 'Mi Establecimiento' || option[1].trim() === 'Mi Dirección') {
            navigate = ROUTES.EditBusinessProfileScreen
        }
        onPress(navigate)
    }

    return (
        <TouchableOpacity style={(index % 2 === 0) ? { ...styles.containerOption } : { ...styles.containerOptionYellow }} onPress={onPressOption}>
            <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
    )
}

export const MenuBurguer = ({ openDialog, onClose, onPress, consumerType }: any) => {
    const [options, setOptions] = useState(
    [
        [<MenuIconNotifications />, 'Notificaciones'],
        [<MenuIconAccount />, 'Mi Cuenta'],
        [consumerType === ConsumerType.Professional ? <MenuIconCommerce /> : <MenuIconAddress />, consumerType === ConsumerType.Professional ? 'Mi Establecimiento' : 'Mi Dirección'],
        [<MenuIconOrders />, 'Mis Pedidos'],
        [<MenuIconLocations />, 'Mis Ubicaciones'],
        [<MenuIconProviders />, 'Mis Proveedores'],
        [<MenuIconCloseSession />, '  Cerrar Sesión']
    ])         
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.outArea} onPress={onClose}></TouchableOpacity>
            <View style={styles.menuArea}>
                {options?.map((o, i) => <MenuOption option={o} index={i} onClose={onClose} onPress={onPress} openDialog={openDialog} />)}
            </View>
        </View>
    )
}