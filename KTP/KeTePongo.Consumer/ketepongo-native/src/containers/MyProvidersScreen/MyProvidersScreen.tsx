import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native'
import { useBackDispatch } from 'constants/UtilsHooks'
import { navigateToMyProducts } from '../../store/authentication'
import { searchByWordRequest, reloadDisplayProviders, navigateToAddNewProvider } from '../../store/consumption/providers'
import { TitleComponent, SearchBarComponent, ListCollectionComponent, MiddleButtonComponent } from 'components'
import { COLORS } from 'constants'
import { IProvider } from '../../store/consumption/providers';
import IconPlus from 'assets/svg/buttons/plusWhite.svg'
import styles from './MyProvidersScreen.style'

function MyProvidersScreen() {

    const dispatch = useDispatch()
    useBackDispatch(navigateToMyProducts)

    const providerState = useSelector(state => state.consumption.providers)
    const providers: IProvider[] = providerState.displayListProviders;
    const pendingToApproveProviders: string[] = providerState.displaypendingToApproveList;
    const [keyWord, setkeyWord] = useState('')

    useEffect(() => {
        const searchByWord = searchByWordRequest(keyWord)(dispatch)
        return () => { searchByWord }
    }, [keyWord])

    return (
        <View style={styles.container}>
            <SearchBarComponent placeHolder={"Busca un Proveedor"} searchByWord={setkeyWord} goBack={() => navigateToMyProducts()(dispatch)} onClose={reloadDisplayProviders()} />
            <TitleComponent title={"Mis Proveedores"} />
            <ListCollectionComponent collection={providers.map(provider=>provider.tradeName)} collectionPending={pendingToApproveProviders} />
            <MiddleButtonComponent icon={<IconPlus />} title={"Añadir Proveedor"} color={COLORS.yellow} pressButton={() => navigateToAddNewProvider()(dispatch)} />
        </View>
    )
}

export { MyProvidersScreen }