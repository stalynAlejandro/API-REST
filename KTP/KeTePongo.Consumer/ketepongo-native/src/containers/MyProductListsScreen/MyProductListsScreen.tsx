import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native'
import { COLORS } from 'constants'
import { IConsumer } from '../../store/authentication/types'
import NavigationService from '../../navigation/NavigationService'
import { useDialog, useBack } from 'constants/UtilsHooks'
import { navigateToAuthScreen, signOutAsync, GetConsumerData } from '../../store/authentication'


import { FilterTags, ProductsList } from './MyProductListsScreen.UI'
import { navigateToFilter } from '../../store/buying'
import { groupByRequest, searchByWordRequest } from '../../store/buying/filters/actions'
import IconCatalog from 'assets/svg/buttons/iconCatalog.svg'
import {
    HeaderWithFilterComponent,
    SearchComponent,
    MenuBurguer,
    DefaultAcceptCancelDialog,
    AgrupationComponent,
    GroupModalComponent,
    MiddleButtonComponent,
    AddProductComponent,
} from 'components'
import { IProvider, navigateToSelectedProviderCatalogCarte } from '../../store/consumption/providers';
import { ROUTES } from '../../constants';

function MyProductListsScreen() {

    const dispatch = useDispatch();
    const providersState = useSelector(state => state.consumption.providers);
    const store = useSelector(state => state.buying)

    const [consumer, setConsumer] = useState<IConsumer>()
    const displayProducts = store.filters.displayProducts;
    const providerTags = store.filters.search.providerTags;
    const locationTags = store.filters.search.locationTags;

    const groups: string[] = ['Proveedor', 'Ubicación', 'Sin Agrupar']
    const [selectedGroup, setSelectedGroup] = useState(groups[0])

    const providers: IProvider[] = providersState.displayListProviders
    const [selectedProviders, setSelectedProviders] = useState(providers[0]?.tradeName)

    const locations: string[] = store.locations.displayList
    const [selectedLocations, setSelectedLocations] = useState(locations[0])

    const [keyWord, setkeyWord] = useState('')
    const [newProductName, setNewProductName] = useState('')

    const [groupModalToggled, setGroupModalToggled] = useState(false)
    const [searchBarToggled, setSearchBarToggled] = useState(false)
    const [addProductModalToggled, setAddProductModalToggled] = useState(false)
    const [menuBurguer, setMenuBurguer] = useState(false)

    const { displayDialog, onPressCancel, onPressOk, openDialog } = useDialog(signOutAsync, navigateToAuthScreen)
    useBack(openDialog)
    useEffect(() => {
        if(!selectedProviders){
            setSelectedProviders(providers[0]?.tradeName);
        } 
    }, [providers])
    useEffect(() => {
        
        const changeGroup = dispatch(groupByRequest({ group: selectedGroup, provider: selectedProviders, location: selectedLocations }))
        return () => { changeGroup }
    }, [selectedGroup, selectedProviders, selectedLocations])

    useEffect(() => {
        if (searchBarToggled && (keyWord.length > 0)) dispatch(searchByWordRequest(keyWord))
    }, [keyWord])

    useEffect(() => {
        const action = GetConsumerData(setConsumer, dispatch)
        return () => { action }
    }, [])

    const onPressSearch = () => setSearchBarToggled(!searchBarToggled)
    const onPressGroupBy = () => setGroupModalToggled(!groupModalToggled)
    const onPressAddProduct = () => setAddProductModalToggled(!addProductModalToggled)
    const onPressBurguer = () => setMenuBurguer(!menuBurguer)

    const onPressAddNewProduct = () => {
        setSelectedLocations('')
        setNewProductName('')
    }

    const onPressBurguerMenuOption = (option: string) => {
        dispatch({ type: 'NAVIGATE' })
        NavigationService.navigate(option)
    }

    const goToCatalog = async () => {
        var provider = providers.find(provider=>provider.tradeName === selectedProviders);
        dispatch(navigateToSelectedProviderCatalogCarte(provider));
    }
    const goToFilter = () => {
        setSearchBarToggled(false) 
        dispatch(navigateToFilter(locations, providers))
    }

    return (
        <View>
            {displayDialog && <DefaultAcceptCancelDialog text={"¿Desea cerrar sesión?"} onPressOk={onPressOk} onPressCancel={onPressCancel} onPressOut={onPressCancel} />}
            {groupModalToggled && <GroupModalComponent groups={groups} selected={selectedGroup} onClose={onPressGroupBy} onPressOption={setSelectedGroup} />}
            {addProductModalToggled && <AddProductComponent provider={selectedProviders} locations={locations} newProductName={newProductName} setNewProductName={setNewProductName} selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} onPressAddNewProduct={onPressAddNewProduct} onClose={onPressAddProduct} />}
            {menuBurguer && <MenuBurguer openDialog={openDialog} onClose={onPressBurguer} onPress={onPressBurguerMenuOption} consumerType={consumer?.consumerType} />}
            {(searchBarToggled) ? <SearchComponent onClose={onPressSearch} searchByWord={setkeyWord} pressGoToFilter={goToFilter} placeholderText={'Busca productos'} /> : <HeaderWithFilterComponent pressSearch={onPressSearch} displayMenu={onPressBurguer} />}
            {selectedGroup === 'Proveedor' && <AgrupationComponent title={"Mis listas de la compra"} tags={providerTags} options={providers.map((s)=>s.tradeName)} selected={selectedProviders} onPressOption={setSelectedProviders} onPressGroup={onPressGroupBy} />}
            {selectedGroup === 'Ubicación' && <AgrupationComponent title={"Mis listas de la compra"} tags={locationTags} options={locations} selected={selectedLocations} onPressOption={setSelectedLocations} onPressGroup={onPressGroupBy} />}
            {selectedGroup === 'Sin Agrupar' && <AgrupationComponent title={"Mis listas de la compra"} tags={['Sin Agrupar']} options={['Sin Agrupar']} selected={selectedGroup} onPressOption={setSelectedGroup} onPressGroup={onPressGroupBy} />}
            <FilterTags providersTags={providerTags} locationsTags={locationTags} />
            {selectedGroup === 'Proveedor' && <MiddleButtonComponent icon={<IconCatalog />} title={"Ir al catálogo"} color={COLORS.indigo} pressButton={goToCatalog} />}
            <ProductsList products={displayProducts} />
        </View>
    )
}

export { MyProductListsScreen }