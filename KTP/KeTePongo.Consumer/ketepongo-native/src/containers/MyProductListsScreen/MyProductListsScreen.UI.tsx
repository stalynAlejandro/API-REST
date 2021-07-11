import React from 'react'
import { useDispatch } from 'react-redux';
import { Text, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native'
import { ProductComponent } from 'components'
import styles from './MyProductListsScreen.component.styles'
import { removeProviderTag, removeLocationTag } from '../../store/buying/filters/actions';

export const FilterTags = ({ providersTags, locationsTags }) => {

    const dispatch = useDispatch()

    return (
        <ScrollView horizontal={true} style={styles.filters} showsHorizontalScrollIndicator={false}>
            {(providersTags.length > 0) && providersTags.map((t) => (
                <TouchableOpacity style={styles.tag} onPress={x => dispatch(removeProviderTag(t))}>
                    <Text style={styles.text}>{t} x</Text>
                </TouchableOpacity>
            ))}
            {(locationsTags.length > 0) && locationsTags.map((l) => (
                <TouchableOpacity style={styles.tag} onPress={x => dispatch(removeLocationTag(l))}>
                    <Text style={styles.text}>{l} x</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export const ProductsList = ({ products }) => {

    const _renderItem = (p) => {
        return (
            <ProductComponent name={p.item.name} price={p.item.price} vegan={p.item.vegan} locations={p.item.locations} alergens={p.item.alergens} />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={products} renderItem={_renderItem} keyExtractor={item => item.id} initialNumToRender={5} maxToRenderPerBatch={10} windowSize={10} />
        </SafeAreaView>
    )
}

