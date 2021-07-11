import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Keyboard, Picker } from 'react-native'
import { IFormNewValue, spainTelephoneProfile } from '../../store/consumption'
import { SubTitleIndigo, TouchableIcon, TypoGraphyOpenSans } from 'components'
import ArrowIconActive from 'assets/svg/arrows/chevronActive.svg'
import ArrowIconInactive from 'assets/svg/arrows/chevronInactive.svg'
import IconPencil from '../../../assets/svg/buttons/pencil.svg'
import LockYellow from '../../../assets/All_Icons/basic/lock_yellow.svg';
import { COLORS, COUNTRIES } from '../../constants'
import styles from './MyAccountScreen.style'

interface IEditComponent {
    title: string,
    placeHolder: string | undefined,
    setExternalData: Dispatch<SetStateAction<string>>,
    infoModalText: string,
    validationRules: RegExp,
    onPressOut: Function,
    onPressContinue: Function,
}

export function EditComponentData({ title, placeHolder, setExternalData, infoModalText, onPressOut, onPressContinue, validationRules }: IEditComponent) {

    const [componentLocalData, setComponentLocalDataData] = useState<IFormNewValue>({ value: placeHolder, isValid: true })

    const validate = (text: string) => {
        if (!validationRules && text.length > 0) {
            setExternalData(text)
            setComponentLocalDataData({ value: text, isValid: true })
            return
        }
        if (validationRules && validationRules.test(text)) {
            setExternalData(text)
            setComponentLocalDataData({ value: text, isValid: true })
            return
        }
        setComponentLocalDataData({ value: text, isValid: false })
    }

    return (
        <View style={styles.modal}>
            <TouchableOpacity style={styles.modalOutSide} onPress={() => onPressOut()} />
            <View style={styles.modalMenu}>
                <Text style={styles.modalTitle}>{title}</Text>
                <TextInput
                    style={styles.textInputStyle}
                    keyboardType={'default'} autoFocus={true}
                    maxLength={30}
                    value={componentLocalData.value}
                    onChangeText={text => validate(text)}
                />
                <Text style={styles.infoText}>{infoModalText}</Text>
                {(!componentLocalData.isValid) && <Text style={styles.errorMessage}>El formato no es válido</Text>}
                <TouchableOpacity
                    style={styles.button}
                    onPressOut={Keyboard.dismiss}
                    onPress={() => (componentLocalData.isValid) && (componentLocalData.value !== placeHolder) && onPressContinue()}>
                    <Text style={((componentLocalData.isValid) && (componentLocalData.value === placeHolder)) ?
                        { ...styles.buttonText, color: COLORS.lightGray } :
                        { ...styles.buttonText, color: COLORS.indigo }}>Continuar</Text>
                    {((componentLocalData.isValid) && (componentLocalData.value === placeHolder)) ? <ArrowIconInactive /> : <ArrowIconActive />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export function ComponentDataUser(args: IDataUserComponent) {
    return (
        <View style={styles.componentData}>
            <SubTitleIndigo title={args.title} />
            <TouchableOpacity onPress={() => args.onEdit()}>
                <View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.text}>{args.value}</Text>
                        <IconPencil />
                    </View>
                    <View style={styles.line}></View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export function ComponentPhoneUser({ title, phoneValue, onEdit }) {
    let countryOptions = Object.values(COUNTRIES).map(c => [c.countryCode, c.callingCode])
    const [prefix, setPrefix] = useState(spainTelephoneProfile)

    return (
        <View>
            <View style={styles.componentData}>
                <SubTitleIndigo title={title} />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ paddingTop: 0 }}>
                        <Picker enabled={false} selectedValue={prefix} style={styles.picker} onValueChange={(prefix) => setPrefix(prefix)}>
                            {countryOptions.map(country => <Picker.Item label={`${country[0]}  + ${country[1]}`} value={country[1]} />)}
                        </Picker>
                    </View>
                    <TouchableOpacity style={{ width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => onEdit()}>
                        <Text style={styles.text}>{phoneValue}</Text>
                        <IconPencil />
                    </TouchableOpacity>
                </View>
                <View style={styles.line}></View>
            </View>
        </View>
    )
}

interface IEditComponentPhone {
    title: string,
    placeHolder: string | undefined,
    setExternalPhone: Dispatch<SetStateAction<string>>,
    infoModalText: string,
    validationRules: RegExp,
    onPressOut: Function,
    onPressContinue: Function,
}

export function EditComponentPhone({ title, placeHolder, setExternalPhone, infoModalText, onPressOut, onPressContinue, validationRules }: IEditComponentPhone) {

    let countryOptions = Object.values(COUNTRIES).map(c => [c.countryCode, c.callingCode])
    const [prefix, setPrefix] = useState(spainTelephoneProfile)
    const [componentLocalphone, setComponentLocalPhone] = useState<IFormNewValue>({ value: placeHolder, isValid: true })

    const validate = (text: string) => {
        var phone = `${prefix}${text}`
        if (!validationRules && phone.length > 0) {
            setExternalPhone(phone)
            setComponentLocalPhone({ value: phone, isValid: true })
            return
        }
        if (validationRules && validationRules.test(phone)) {
            setExternalPhone(phone)
            setComponentLocalPhone({ value: phone, isValid: true })
            return
        }
        setComponentLocalPhone({ value: phone, isValid: false })
    }

    return (
        <View style={styles.modal}>
            <TouchableOpacity style={styles.modalOutSide} onPress={() => onPressOut()} />
            <View style={styles.modalMenu}>
                <Text style={styles.modalTitle}>{title}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ paddingTop: 0 }}>
                        <Picker enabled={false} selectedValue={prefix} style={{ ...styles.picker, width: 140 }} onValueChange={(prefix) => setPrefix(prefix)}>
                            {countryOptions.map(country => <Picker.Item label={`${country[0]}  + ${country[1]}`} value={country[1]} />)}
                        </Picker>
                    </View>
                    <View style={{ width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput maxLength={9} onChangeText={text => validate(text)} autoFocus={true} style={styles.text}>{placeHolder}</TextInput>
                    </View>
                </View>
                <View style={styles.line}></View>
                <Text style={styles.infoText}>{infoModalText}</Text>
                {(!componentLocalphone.isValid) && <Text style={styles.errorMessage}>El teléfono no es válido</Text>}
                <TouchableOpacity
                    style={styles.button}
                    onPressOut={Keyboard.dismiss}
                    onPress={() => (componentLocalphone.isValid) && (componentLocalphone.value !== placeHolder) && onPressContinue()}>
                    <Text style={((componentLocalphone.isValid) && (componentLocalphone.value !== placeHolder)) ?
                        { ...styles.buttonText, color: COLORS.indigo } :
                        { ...styles.buttonText, color: COLORS.lightGray }}>Continuar</Text>
                    {((componentLocalphone.isValid) && (componentLocalphone.value !== placeHolder)) ? <ArrowIconActive /> : <ArrowIconInactive />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const ChangePasswordTouchable = ({ onPress }) => (
    <TouchableIcon
        isWhiteBackground={false}
        onPress={() => onPress()}
        icon={(
            <View style={styles.change_password_wrapper}>
                <LockYellow style={styles.icon} />
                <TypoGraphyOpenSans text={"Cambiar Contraseña"} style={styles.change_password} />
            </View>
        )}
    />
);

export const ConfirmChangeCode = ({ value, message, setValue, pressAccept, pressCancel, pressResendCode }: any) => {
    return (
        <View style={styles.dialogContainer}>
            <View style={styles.dialogBox}>
                <Text style={styles.dialogText}>{message}</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setValue(text)}
                    placeholder={"Escribe aquí el código de verificación"}
                    value={value}
                    maxLength={6}
                />
                <View style={styles.columnContainer}>
                    <Text style={styles.dialogInfoText}>
                        ¿No has recibido el código?
                    </Text>
                    <TouchableOpacity onPress={() => pressResendCode()}>
                        <Text style={{ ...styles.dialogInfoText, color: COLORS.indigo }}>
                            Pulsa aquí.
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dialogButtons} >
                    <TouchableOpacity onPress={() => pressCancel()}>
                        <Text style={styles.dialogCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressAccept()}>
                        <Text style={styles.dialogAdd}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}