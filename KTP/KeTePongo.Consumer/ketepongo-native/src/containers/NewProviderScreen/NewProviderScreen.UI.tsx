import React, { Dispatch, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Picker, Keyboard } from 'react-native'
import { COLORS, COUNTRIES, TYPOGRAPHY } from '../../constants'
import ArrowIconActive from 'assets/svg/arrows/chevronActive.svg'
import ArrowIconInactive from 'assets/svg/arrows/chevronInactive.svg'
import {
    IFormNewValue,
    spainTelephoneProfile,
    regularExpressionEmail,
    regularExpressionPhone
} from '../../store/consumption/'
import { requestInfoForLinkProvider, reloadRequestInfoLinkProviderRequest } from '../../store/consumption/providers'

import styles from './NewProviderScreen.style'


export function OptionModeAddProvider({ title, icon, onPress }: any) {
    const onPressOption = () => onPress(title)
    return (
        <TouchableOpacity style={styles.option} onPress={onPressOption}>
            {icon}
        </TouchableOpacity>
    )
}

export const ConfirmationDialogProvider = ({ provider, pressAddProvider }: any) => {
    return (
        <View style={styles.dialogProvider}>
            <View style={styles.dialogBox}>
                <Text style={styles.dialogText}>Vas a añadir a '{provider.tradeName}' a tus listas.</Text>
                <Text style={{ ...styles.dialogText, ...TYPOGRAPHY.nunito_bold }}>¿Estás seguro?</Text>
                <View style={styles.dialogButtons} >
                    <TouchableOpacity onPress={reloadRequestInfoLinkProviderRequest()}>
                        <Text style={styles.dialogCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pressAddProvider}>
                        <Text style={styles.dialogAdd}>Añadir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export function AddProviderModal({ title, subtitle, onPressOut }: any) {
    const [name, setName] = useState<IFormNewValue>({ value: '', isValid: false })
    const [email, setEmail] = useState<IFormNewValue>({ value: '', isValid: false })
    const [phone, setPhone] = useState<IFormNewValue>({ value: '', isValid: false })
    const [nameIsDone, setNameIsDone] = useState(false)

    const setNameProvider = () => (name.isValid) && setNameIsDone(true)

    return (
        <View style={styles.modal}>
            <TouchableOpacity style={styles.modalOutSide} onPress={onPressOut} />
            <View style={styles.modalMenu}>
                {(!nameIsDone) ?
                    <InputName title={title} name={name} setName={setName} pressContinue={setNameProvider} />
                    :
                    <View>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <Text style={styles.modalSubTitle}>{subtitle}</Text>
                        <View style={styles.modalBody}>
                            <InputEmail email={email} setEmail={setEmail} />
                            <InputPhone phone={phone} setPhone={setPhone} />
                        </View>
                        <TouchableOpacity style={styles.button} onPressOut={Keyboard.dismiss} onPress={requestInfoForLinkProvider(name, email, phone)}>
                            <Text style={(email.isValid || phone.isValid) ? styles.active : styles.inactive}>Añadir</Text>
                            {(email.isValid || phone.isValid) ? <ArrowIconActive /> : <ArrowIconInactive />}
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}


function InputName({ title, name, setName, pressContinue }: any) {
    return (
        <View>
            <Text style={styles.modalTitle}>{title}</Text>

            <TextInput
                onChangeText={name => setName({ value: name, isValid: (name.length > 0) ? true : false })}
                keyboardType={'default'} autoFocus={true}
                maxLength={30}
                placeholder={"Escribe el nombre del proveedor"}
                placeholderTextColor={COLORS.lightGray} />

            <View style={styles.line}></View>

            <TouchableOpacity style={styles.button} onPressOut={Keyboard.dismiss} onPress={pressContinue}>
                <Text style={(name.isValid) ? styles.active : styles.inactive}>Continuar</Text>
                {(name.isValid && name.length > 0) ? <ArrowIconActive /> : <ArrowIconInactive />}
            </TouchableOpacity>
        </View>
    )
}


function InputEmail({ email, setEmail }: any) {
    const ValidateEmail = (e: string) => {
        if (regularExpressionEmail.test(e)) {
            setEmail({ value: e, isValid: true })
        } else {
            setEmail({ value: e, isValid: false })
        }
    }

    return (
        <View>
            <TextInput
                onChangeText={e => ValidateEmail(e)}
                keyboardType={'email-address'}
                autoFocus={true}
                placeholder={"Escribe aquí el email del proveedor"}
                placeholderTextColor={COLORS.lightGray} />
            <View style={styles.line}></View>
            {(!email.isValid && email.value.length > 0) && <Text style={styles.errorMessage}>El email no es válido</Text>}
        </View >
    )
}

function InputPhone({ phone, setPhone }: any) {
    let countryOptions = Object.values(COUNTRIES).map(c => [c.countryCode, c.callingCode])
    const [prefix, setPrefix] = useState(spainTelephoneProfile)

    const ValidatePhone = (formatphone: string) => {
        var phone = `${prefix}${formatphone}`
        if (regularExpressionPhone.test(phone)) {
            setPhone({ value: phone, isValid: true })
        } else {
            setPhone({ value: phone, isValid: false })
        }
    }

    return (
        <View>
            <View style={styles.phonecode}>
                <Picker selectedValue={prefix} style={styles.picker} onValueChange={(prefix) => setPrefix(prefix)}>
                    {countryOptions.map(country => <Picker.Item label={`${country[0]}  + ${country[1]}`} value={country[1]} />)}
                </Picker>
                <TextInput
                    onChangeText={phone => ValidatePhone(phone)}
                    keyboardType={'numeric'}
                    autoFocus={false}
                    maxLength={9}
                    placeholder={"Escribe aquí el teléfono del proveedor"}
                    placeholderTextColor={COLORS.lightGray} />
            </View>
            <View style={styles.line}></View>
            {(!phone.isValid && (phone.value.length - prefix.length) > 0) && <Text style={styles.errorMessage}>El teléfono no es válido</Text>}
        </View>
    )
}
