import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './MenuBurguer.style'
import IconNotifications from 'assets/svg/info/misNotificaciones.svg'
import IconAccount from 'assets/svg/info/miCuenta.svg'
import IconOrders from 'assets/svg/info/misPedidos.svg'
import IconProviders from 'assets/svg/info/misProveedores.svg'
import IconLocations from 'assets/svg/info/misUbicaciones.svg'
import IconAddress from 'assets/svg/info/miDireccion.svg'
import IconComerce from 'assets/svg/info/miComercio.svg'
import IconCloseSession from 'assets/svg/info/exit.svg'
import NotificationDot from 'assets/notification/red_dot.svg'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

const IconNotificationSvg = () => <IconNotifications viewBox={"5 4 25 15"} />
const NotificationDotSvg = ()=> <NotificationDot viewBox={"17 3 25 15"} style={styles.notificationDot}/>


export const MenuIconNotifications = () => {
    const notifications = useSelector((state: AppState) => state.notifications);
    return <View style={styles.notificationIcon}>
        <IconNotificationSvg />
        {notifications.anyNotificationPendingToRead && <NotificationDotSvg/>}
    </View>
}
export const MenuIconAccount = () => <IconAccount viewBox={"5 -1 25 15"} />
export const MenuIconOrders = () => <IconOrders viewBox={"3 -1 25 15"} />
export const MenuIconCommerce = () => <IconComerce viewBox={"3 -1 25 15"} />
export const MenuIconAddress = () => <IconAddress viewBox={"3 -1 25 15"} />
export const MenuIconLocations = () => <IconLocations viewBox={"3 -1 25 15"} />
export const MenuIconProviders = () => <IconProviders viewBox={"3 0 25 15"} />
export const MenuIconCloseSession = () => <IconCloseSession viewBox={"10 14"} />


