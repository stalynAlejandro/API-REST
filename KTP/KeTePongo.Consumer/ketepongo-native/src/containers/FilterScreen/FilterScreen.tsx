import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native'
import { HeaderWithBackComponent, BasicButtonComponent, FilterModalComponent } from 'components'
import { filterRequest } from '../../store/buying/filters/actions'
import { SelectFromList } from './FilterScreen.UI'
import { useBackDispatch } from 'constants/UtilsHooks'
import { navigateToMyProducts } from '../../store/authentication'
import styles from './FilterScreen.style'

function FilterScreen() {

    const dispatch = useDispatch()
    const consumptionState = useSelector(state => state.consumption)
    const buyingStore = useSelector(state => state.buying.locations)

    const providers: string[] = consumptionState.providers.displayList;
    const locations: string[] = buyingStore.displayList;

    const [selectedLocations] = useState(locations.map((loc: string, index: number) => [index] = [loc, 0]))
    const [selectedProviders] = useState(providers.map((prov: string, index: number) => [index] = [prov, 0]))

    const [toggleModalLocation, setToggleModalLocation] = useState(false)
    const [toggleModalProvider, setToggleModalProvider] = useState(false)

    useBackDispatch(navigateToMyProducts)

    const onPressFilter = () => {
        const filterLocations = selectedLocations.filter((x) => x[1] === 1).map(x => x[0])
        const filterProvider = selectedProviders.filter((x) => x[1] === 1).map(x => x[0])
        navigateToMyProducts()(dispatch)
        dispatch(filterRequest({ providerTags: [...filterProvider], locationTags: [...filterLocations] }))
    }

    return (
        <View style={styles.container}>
            <HeaderWithBackComponent onPress={() => navigateToMyProducts()(dispatch)} title={"Filtros"} />
            <BasicButtonComponent text={"Filtrar"} isActive={true} onPress={onPressFilter} />
            <SelectFromList title={"Ubicación"} list={selectedLocations} onPress={setToggleModalLocation} />
            <SelectFromList title={"Proveedor"} list={selectedProviders} onPress={setToggleModalProvider} />
            {toggleModalLocation && <FilterModalComponent title={"Elige una o varias ubicaciones"} setList={selectedLocations} toggleModal={setToggleModalLocation} />}
            {toggleModalProvider && <FilterModalComponent title={"Elige uno o varios proveedores"} setList={selectedProviders} toggleModal={setToggleModalProvider} />}
        </View>
    )
}

export { FilterScreen }