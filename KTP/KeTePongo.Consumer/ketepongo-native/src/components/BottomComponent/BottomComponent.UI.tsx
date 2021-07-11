import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import BuyLogoActive from 'assets/svg/buttons/comprasActive.svg'
import SellLogoActive from 'assets/svg/buttons/ventasActive.svg'
import BuyLogoInactive from 'assets/svg/buttons/comprasInactive.svg'
import SellLogoInactive from 'assets/svg/buttons/ventasInactive.svg'
import styles from './BottomComponent.style'

const OptionLeft = ({ onPress, onFocus, optionTitle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={(!onFocus) ? styles.optionLeftActive : styles.optionLeftInactive}>
            {(!onFocus) ?
                <BuyLogoActive width={30} height={30} />
                :
                <BuyLogoInactive width={25} height={25} />
            }
            <Text style={(!onFocus)? styles.textActive : styles.textInactive }>{optionTitle}</Text>
        </TouchableOpacity>
    )
}

const OptionRight = ({ onPress, onFocus, optionTitle }) => {

    return (
        <TouchableOpacity onPress={onPress} style={(onFocus) ? styles.optionRightActive : styles.optionRightInactive }>
            {(onFocus) ?
                <SellLogoActive width={25} height={25} />
                :
                <SellLogoInactive width={25} height={25} />
            }
            <Text style={(onFocus)? styles.textActive : styles.textInactive }>{optionTitle}</Text>
        </TouchableOpacity>
    )
}

export const BottomBar = ({ onFocus, onPressLeft, onPressRight }) => {
    return (
        <View style={styles.container}>
            <OptionLeft onFocus={onFocus} optionTitle={'Pedir'} onPress={onPressLeft}/>
            <OptionRight onFocus={onFocus} optionTitle={'Ofrecer'} onPress={onPressRight}/>
        </View>
    )
}