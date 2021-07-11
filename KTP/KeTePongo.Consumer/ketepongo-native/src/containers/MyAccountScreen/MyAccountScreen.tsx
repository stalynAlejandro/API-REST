import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, SafeAreaView } from 'react-native'
import { useBackDispatch } from 'constants/UtilsHooks'
import { IAuthState } from '../../store/authentication'
import { HeaderWithBackComponent, MainTitleIndigo, BasicButtonComponent, ErrorDetail, DialogDetail } from 'components'
import { regularExpressionEmail, regularExpressionPhone } from '../../store/consumption/'
import { ComponentDataUser, ComponentPhoneUser, EditComponentPhone, EditComponentData, ChangePasswordTouchable, ConfirmChangeCode } from './MyAccountScreen.UI'
import { changePhoneRequested, confirmChangePhone, changeUserNameRequested, changeEmailRequested, confirmChangeEmail, resendCodeEmail, resendCodePhone } from '../../store/authentication/operations'
import { navigateToMyProducts, reloadPhoneChangeRequested, reloadConfirmationCodeRequest, reloadEmailChangeRequested, reloadNameChangeRequested, reloadResendCodeChangeRequested } from '../../store/authentication/actions'

import { store } from '../../App';
import db from '../../store/apis/db';
import styles from './MyAccountScreen.style'

interface IUserData {
    email: string,
    emailConfirmed: boolean,
    id: number,
    name: string,
    userName: string,
    userPhone: {
        phoneNumber: string
    }
}

function MyAccountScreen() {
    const dispatch = useDispatch()

    const authentication = useSelector(state => state.authentication) as IAuthState

    const [onEditName, setOnEditName] = useState(false)
    const [onEditEmail, setOnEditEmail] = useState(false)
    const [onEditPhone, setOnEditPhone] = useState(false)

    const [editName, setEditName] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [userData, setUserData] = useState<IUserData>()

    const [codeEmail, setCodeEmail] = useState('')
    const [codePhone, setCodePhone] = useState('')

    useBackDispatch(navigateToMyProducts)

    useEffect(() => {
        async function fetchUserData() {
            let result = await (await db.apiUsers({}, store.getState)).get("User")
            setUserData({
                email: result.data.email,
                emailConfirmed: result.data.emailConfirmed,
                name: result.data.name,
                id: result.data.id,
                userName: result.data.userName,
                userPhone: {
                    phoneNumber: result.data.userPhone.phoneNumber
                }
            })
            setEditPhone(result.data.userPhone.phoneNumber)
            setEditEmail(result.data.email)
            setEditName(result.data.name)
        }
        fetchUserData()
    }, [authentication.changeNameState, authentication.changeEmailState, authentication.changePhoneState])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
            <HeaderWithBackComponent onPress={() => navigateToMyProducts()(dispatch)} title={"Mi Cuenta"} />
                <MainTitleIndigo title={"Datos del usuario"} />
                <ComponentDataUser title={"Nombre de usuario"} value={userData?.name} onEdit={() => setOnEditName(true)} />
                <ComponentDataUser title={"Dirección de email"} value={userData?.email} onEdit={() => setOnEditEmail(true)} />
                <ComponentPhoneUser title={"Teléfono móvil"} phoneValue={(userData?.userPhone.phoneNumber) && userData?.userPhone.phoneNumber.substring(userData?.userPhone.phoneNumber.length - 9)} onEdit={() => setOnEditPhone(true)} />
                <BasicButtonComponent text={"Aceptar"} isActive={true} onPress={() => navigateToMyProducts()(dispatch)} />

                {/** EDIT NAME */}
                {onEditName &&
                    <EditComponentData
                        title={"Editar Nombre"}
                        placeHolder={userData?.name}
                        setExternalData={setEditName}
                        onPressOut={() => setOnEditName(false)}
                        onPressContinue={() => changeUserNameRequested({ userName: editName })(dispatch, store.getState)}
                    />}

                {(authentication.changeNameState) &&
                    <DialogDetail
                        message={"Tu nombre ha sido actualizado correctamente!"}
                        onPressOk={() => {
                            reloadNameChangeRequested()(dispatch)
                            setOnEditName(false)
                        }} />}

                {/** EDIT EMAIL */}
                {onEditEmail &&
                    <EditComponentData
                        title={"Editar Email"}
                        placeHolder={userData?.email}
                        setExternalData={setEditEmail}
                        infoModalText={"Te enviaremos un correo de verificación al nuevo email."}
                        onPressOut={() => setOnEditEmail(false)}
                        onPressContinue={() => changeEmailRequested({ email: editEmail })(dispatch, store.getState)}
                        validationRules={regularExpressionEmail} />}

                {(authentication.pendingToConfirmEmailWithCodeState) && (!authentication.error) && (!authentication.resendCodeState) &&
                    <ConfirmChangeCode
                        value={codeEmail}
                        message={"Introduce el código de verificación que te acabamos de enviar al nuevo email."}
                        setValue={setCodeEmail}
                        pressAccept={() => confirmChangeEmail({ code: codeEmail })(dispatch, store.getState)}
                        pressCancel={() => {
                            reloadEmailChangeRequested()(dispatch)
                            setOnEditEmail(false)
                            setCodeEmail('')
                        }}
                        pressResendCode={() => resendCodeEmail()(dispatch, store.getState)} />}

                {(authentication.changeEmailState && !authentication.pendingToConfirmEmailWithCodeState) &&
                    <DialogDetail
                        message={"Tu email ha sido actualizado correctamente!"}
                        onPressOk={() => {
                            reloadEmailChangeRequested()(dispatch)
                            setOnEditEmail(false)
                            setCodeEmail('')
                        }} />}

                {(authentication.resendCodeState) && (authentication.pendingToConfirmEmailWithCodeState) &&
                    <DialogDetail
                        message={"Te hemos reenviado un correo con el código!  Comprueba que no esté en la carpeta Spam."}
                        onPressOk={() => { reloadResendCodeChangeRequested()(dispatch) }} />}

                {/** EDIT PHONE */}
                {onEditPhone &&
                    <EditComponentPhone
                        title={"Editar Teléfono"}
                        placeHolder={(userData?.userPhone.phoneNumber) && userData?.userPhone.phoneNumber.substring(userData?.userPhone.phoneNumber.length - 9)}
                        setExternalPhone={setEditPhone}
                        infoModalText={"Te enviaremos un sms con el código de verificación."}
                        onPressOut={() => setOnEditPhone(false)}
                        onPressContinue={() => changePhoneRequested({ phone: editPhone })(dispatch, store.getState)}
                        validationRules={regularExpressionPhone}
                    />}

                {(authentication.pendingToConfirmPhoneWithCodeState) && (!authentication.error) && (!authentication.resendCodeState) &&
                    <ConfirmChangeCode
                        value={codePhone}
                        message={"Introduce el código de verificación que te acabamos de enviar por sms."}
                        setValue={setCodePhone}
                        pressAccept={() => confirmChangePhone({ newCode: codePhone, newTelephone: editPhone })(dispatch, store.getState)}
                        pressCancel={() => {
                            reloadPhoneChangeRequested()(dispatch)
                            setOnEditPhone(false)
                            setCodePhone('')
                        }}
                        pressResendCode={() => resendCodePhone()(dispatch, store.getState)} />}

                {(authentication.changePhoneState && !authentication.pendingToConfirmPhoneWithCodeState) &&
                    <DialogDetail
                        message={"Tu teléfono ha sido actualizado correctamente!"}
                        onPressOk={() => {
                            reloadPhoneChangeRequested()(dispatch)
                            setOnEditPhone(false)
                            setCodePhone('')
                        }} />}

                {(authentication.resendCodeState) && (authentication.pendingToConfirmPhoneWithCodeState) &&
                    <DialogDetail
                        message={"Te hemos reenviado un sms con el código!"}
                        onPressOk={() => { reloadResendCodeChangeRequested()(dispatch) }} />}

                {/* ERROR */}
                {(authentication.error) &&
                    <ErrorDetail errorDetail={authentication.error} onPressOk={() => reloadConfirmationCodeRequest()(dispatch)} />}
            </View>
        </SafeAreaView>
    )
}

export { MyAccountScreen }