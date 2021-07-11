import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native'
import { HeaderWithBackComponent, ErrorDetail } from 'components'
import { useBackDispatch } from 'constants/UtilsHooks'
import { InitialProvider } from '../../model/DTOs/InitialProvider'
import { addProviderToConsumption, navigateToMyProviders, IProvidersState, reloadRequestInfoLinkProviderRequest } from '../../store/consumption/providers'
import { OptionModeAddProvider, AddProviderModal, ConfirmationDialogProvider } from './NewProviderScreen.UI'
import IconContacts from 'assets/svg/buttons/addContacts.svg'
import IconManual from 'assets/svg/buttons/addManual.svg'
import IconQR from 'assets/svg/buttons/addQR.svg'
import styles from './NewProviderScreen.style'

function NewProviderScreen() {

    const dispatch = useDispatch()
    useBackDispatch(navigateToMyProviders)

    const [addMode, setAddMode] = useState('')
    const [newLinkProviderRequest, setNewLinkProviderRequest] = useState(InitialProvider)
    const providerState = useSelector(state => state.consumption.providers) as IProvidersState

    return (
        <View style={styles.container}>
            <HeaderWithBackComponent onPress={() => navigateToMyProviders()(dispatch)} title={"Nuevo Proveedor"} />
            <View style={styles.optionsContainer}>
                <OptionModeAddProvider icon={<IconQR />} title={"ModeQR"} onPress={setAddMode} />
                <OptionModeAddProvider icon={<IconContacts />} title={"ModeContacts"} onPress={setAddMode} />
                <OptionModeAddProvider icon={<IconManual />} title={"ModeManual"} onPress={setAddMode} />
            </View>

            {addMode === 'ModeManual' &&
                <AddProviderModal
                    title={"Añadir proveedor manualmente"}
                    subtitle={"Puedes añadir el proveedor manualmente introduciendo su correo electrónico o el teléfono móvil"}
                    linkProviderRequest={newLinkProviderRequest}
                    setLinkProviderRequest={setNewLinkProviderRequest}
                    onPressOut={setAddMode} />}

            {(providerState.pendingProvider && !providerState.loading && !providerState.error)
                && <ConfirmationDialogProvider provider={providerState.pendingProvider} pressAddProvider={addProviderToConsumption(providerState.pendingProvider)} />}

            {(providerState.error)
                && <ErrorDetail errorDetail={providerState.error} onPressOk={reloadRequestInfoLinkProviderRequest()} />}
        </View>
    )
}

export { NewProviderScreen }