import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { navigateToMyProducts } from '../../store/authentication'
import { searchByWordRequest, reloadDisplayLocations } from '../../store/buying/locations/actions'
import { TitleComponent, SearchBarComponent, ListCollectionComponent, MiddleButtonComponent } from 'components'
import { useBackDispatch } from 'constants/UtilsHooks'
import { COLORS } from 'constants'
import IconPlus from 'assets/svg/buttons/plusWhite.svg'
import { ModalNewLocation, ModalEditLocation } from './MyLocationsScreen.UI'
import styles from './MyLocationsScreen.style'

function MyLocationsScreen() {

    const dispatch = useDispatch()
    const store = useSelector(state => state.buying)

    const locations: string[] = store.locations.displayList;

    const [modalLocation, setModalLocation] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')

    const [keyWord, setkeyWord] = useState('')

    useEffect(() => {
        const searchByWord = dispatch(searchByWordRequest(keyWord))
        return () => { searchByWord }
    }, [keyWord])


    useBackDispatch(navigateToMyProducts)

    const goToBackArrow = () => {
        dispatch(reloadDisplayLocations())
        dispatch(navigateToMyProducts())
    }
    const onPressClose = () => dispatch(reloadDisplayLocations())

    return (
        <View style={styles.container}>
            <SearchBarComponent placeHolder={"Busca una Ubicación"} searchByWord={setkeyWord} goBack={goToBackArrow} onClose={onPressClose} />
            <TitleComponent title={"Mis Ubicaciones"} />
            <ListCollectionComponent collection={locations} selectedItem={setSelectedLocation} onPressEdit={() => setModalLocation('Edit')} />
            <MiddleButtonComponent icon={<IconPlus />} title={"Añadir Ubicación"} color={COLORS.yellow} pressButton={() => setModalLocation('Create')} />
            {modalLocation === 'Create' && <ModalNewLocation title={"Añadir Ubicación"} toggleModal={()=> setModalLocation('')} />}
            {modalLocation === 'Edit' && <ModalEditLocation title={"Editar Ubicación"} toggleModal={() => setModalLocation('')} selectedItem={selectedLocation}/>}
        </View>
    )
}

export { MyLocationsScreen }