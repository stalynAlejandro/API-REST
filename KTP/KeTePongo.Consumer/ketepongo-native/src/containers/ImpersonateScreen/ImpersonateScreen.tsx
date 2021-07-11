import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, SafeAreaView, Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getAccesTokenFromUserEmail } from '../../store/authentication/operations'
import styles from './ImpersonateScreen.style';
import { AppState } from '../../store'


function ImpersonateScreen() {

    const dispatch = useDispatch()
    const [userEmail, setUserEmail] = useState('');

    const error = useSelector((state: AppState) => state.authentication.error)

    const getAcces = () => {
        dispatch(getAccesTokenFromUserEmail({ userEmail: userEmail }))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Usuario Email</Text>

                <TextInput style={styles.textInput} onChangeText={text => setUserEmail(text)} value={userEmail} />

                <View style={styles.button}>
                    <Button title="OK" onPress={getAcces} />
                </View>

                {error && <Text> No se puede suplantar el usuario. </Text> }
            </View>
        </SafeAreaView>
    )
}

export { ImpersonateScreen };