import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { getBottomBarIndex } from '../../navigation/NavigationService'
import IconBurger from 'assets/svg/buttons/burgerMenu.svg'
import IconSearch from 'assets/svg/buttons/search.svg'
import IconCart from 'assets/svg/buttons/shoppingcartActive.svg'
import KTPIcon from '../../../assets/All_Icons/logos/LogoKTPhorizontal.svg'
import styles from './HeaderWithFilterAndBackComponent.style'
import ArrowBack from 'assets/svg/arrows/arrowBack.svg'
import { useSelector, useDispatch } from 'react-redux'
import { navigateToCart } from '../../store/order/actions'
import IconCartAlert from 'assets/svg/buttons/shoppingCartAlert.svg'
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

export const HeaderWithFilterAndBackComponent = ({ goBackTo, pressSearch, displayMenu }) => {

    const { index } = getBottomBarIndex()

    return (
        <View style={styles.out_container}>
             <TouchableOpacity style={styles.icon} onPress={goBackTo}>
                        <ArrowBack style={styles.arrow} />
                    </TouchableOpacity>
            <View style={styles.container}>
                   
                    < OptionSearch onPress={pressSearch} />
                    {(index === 0) && <OptionCart />}
            </View>
        </View>
        
    )
}