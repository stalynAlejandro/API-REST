import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import VeganIcon from 'assets/svg/info/Vegan.svg'
import AlergenIcon from 'assets/svg/info/Alergenos.svg'
import CartIcon from 'assets/svg/buttons/buttonBuy.svg'
import AddIcon from 'assets/svg/buttons/moreButton.svg'
import LessIcon from 'assets/svg/buttons/lessButton.svg'
import styles from './ProductComponent.style'

const AddToCartButton = ({ quantity, setQuantity }) => {

    const addProduct = () => setQuantity(quantity + 1)
    const removeProduct = () => setQuantity(quantity - 1)

    return (
        <View>
            {(quantity > 0) ?
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={removeProduct}>
                        <LessIcon />
                    </TouchableOpacity>
                    <Text style={styles.number}>{quantity}</Text>
                    <TouchableOpacity onPress={addProduct}>
                        <AddIcon />
                    </TouchableOpacity>
                </View>
                :
                <TouchableOpacity onPress={addProduct}>
                    <CartIcon />
                </TouchableOpacity>
            }
        </View>
    )
}


export const ProductComponent = ({ name, price, vegan, locations, alergens }) => {

    const [quantity, setQuantity] = useState(0)

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.name}>{name}</Text>
                {vegan && <VeganIcon />}
            </View>
            <View style={styles.body}>
                <View style={styles.bodyLocations}>
                    {locations.map(l => <Text style={styles.locations}>{l}, </Text>)}
                </View>
                {(alergens.length > 0) && <AlergenIcon />}
            </View>
            <View style={styles.body}>
                <Text style={styles.price}>{price}€</Text>
                <AddToCartButton quantity={quantity} setQuantity={setQuantity} />
            </View>
        </View>
    )
}
