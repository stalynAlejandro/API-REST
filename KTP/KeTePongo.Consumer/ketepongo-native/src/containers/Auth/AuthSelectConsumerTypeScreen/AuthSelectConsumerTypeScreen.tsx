import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { Spinner, DefaultAcceptCancelDialog } from "components";
import { IAuthState, signOutAsync, navigateToAuthScreen } from '../../../store/authentication'
import { navigateToBusinessRegistration, navigateToAuthConfirmationWithData } from '../../../store/authentication/actions'
import LogoKTP from '../../../../assets/All_Icons/logos/LogoKTPhorizontal.svg'
import LogoProfessional from '../../../../assets/svg/buttons/ventasActive.svg'
import LogoIndividual from '../../../../assets/svg/info/miCuentaActive.svg'
import LogoWelcome from '../../../../assets/svg/info/welcome.svg'
import Background from '../../../../assets/svg/background.svg'
import styles from './AuthSelectConsumerTypeScreen.style'
import { LAYOUT } from 'constants';
import { useDispatch } from 'react-redux'
import { useDialog, useBack } from '../../../constants/UtilsHooks'
import { ConsumerType } from '../../../model/DTOs/Consumer/ConsumerType'

function AuthSelectConsumerTypeScreen() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.authentication) as IAuthState
    const { displayDialog, onPressCancel, onPressOk, openDialog } = useDialog(signOutAsync, navigateToAuthScreen)
    const { height, width } = LAYOUT.WINDOW;

    useBack(openDialog)

    return (
        (state.isWaitingAnswerFromServer) ?
            <Spinner />
            :
            <View style={styles.container}>
                {displayDialog && <DefaultAcceptCancelDialog text={"¿Desea cerrar sesión?"} onPressOk={onPressOk} onPressCancel={onPressCancel} onPressOut={onPressCancel} />}
                <Background height={height} width={width} style={styles.background} />
                <LogoKTP />
                <View style={styles.welcomeContainer}>
                    <Text style={styles.title}>¡Bienvenido a Ketepongo!</Text>
                    <Text style={styles.paragraph}>
                        ¡Enhorabuena! Te has registrado correctamente en Ketepongo.
                        Por último necesitamos que nos digas si vas a usarlo para tus
                        compras habituales en tu propia casa como particular, o para tus
                        compras en establecimiento como profesional.
                    </Text>
                </View>
                <LogoWelcome />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigateToBusinessRegistration(ConsumerType.Individual)(dispatch)
                    }}>
                        <LogoIndividual />
                        <Text style={styles.buttonText}>Pedir como particular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigateToBusinessRegistration(ConsumerType.Professional)(dispatch)
                    }}>
                        <LogoProfessional />
                        <Text style={styles.buttonText}>Pedir como profesional</Text>
                    </TouchableOpacity>
                </View>
            </View >
    )
}

export { AuthSelectConsumerTypeScreen }