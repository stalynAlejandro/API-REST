import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { AppState } from '../../store'
import { getBottomBarIndex } from '../../navigation/NavigationService'
import IconBurger from 'assets/svg/buttons/burgerMenu.svg'
import IconSearch from 'assets/svg/buttons/search.svg'
import IconCart from 'assets/svg/buttons/shoppingcartActive.svg'
import IconCartAlert from 'assets/svg/buttons/shoppingCartAlert.svg'
import KTPIcon from '../../../assets/All_Icons/logos/LogoKTPhorizontal.svg'
import NotificationDot from '../../../assets/notification/red_dot.svg'
import styles from './HeaderWithFilterComponent.style'
import { useSelector, useDispatch } from 'react-redux'
import { navigateToCart } from '../../store/order/actions'
import {
    TypoGraphyNunitoBold
  } from "components";


const OptionCart = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state: AppState) => state.order.currentOrder.productLines);
    const navigateToCartScreen = () => dispatch(navigateToCart());    
    return (
        <TouchableOpacity style={styles.area} onPress={()=>navigateToCartScreen()}>
            {orders.length===0 && <IconCart style={styles.icon} />}
            {orders.length !==0 && (
            <View style={styles.cartContainer}>
                <IconCartAlert style={styles.iconWithText} />  
                    <TypoGraphyNunitoBold
                        style={styles.text}
                        text={orders.length}
                    />
                </View>
               )
            }
            
        </TouchableOpacity>
    )
}

const OptionSearch = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.area} onPress={onPress}>
            <IconSearch style={styles.icon} />
        </TouchableOpacity>
    )
}

const OptionBurguer = ({onPressMenu}) => {
    const notifications = useSelector((state: AppState) => state.notifications);

    return (
        <TouchableOpacity style={styles.area} onPress={onPressMenu}>
            <View>
                <IconBurger style={styles.icon} />
                {notifications.anyNotificationPendingToRead && <NotificationDot style={styles.notificationDot}/>}
            </View>
        </TouchableOpacity>
    )
}

export const HeaderWithFilterComponent = ({ pressSearch, displayMenu }) => {

    const { index } = getBottomBarIndex()

    return (
        <View style={styles.container}>
            <KTPIcon style={styles.logo} />
            < OptionSearch onPress={pressSearch} />
            {(index === 0) && <OptionCart />}
            <OptionBurguer onPressMenu={displayMenu}/>
        </View>
    )
}