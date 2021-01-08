import React, { useState } from 'react'
import { IonButton, IonCol, IonRow, IonText, IonList, IonItem, IonLabel, IonInput } from '@ionic/react';
import './LoginForm.scss'

const LoginForm = ({onToggle} : any) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true)
        if (!username) setUsernameError(true)
        if (!password) setPasswordError(true)
        if(username && password){
            setUsernameError(false)
            setPasswordError(false)
            console.log("LOGIN " + username + " , " + password)

            const response = await fetch('http://localhost:3000/users')
            const body = await response.json()
            console.log(body)
        }
    }

    return (
        <form id="login-container" noValidate onSubmit={login}>
            <IonList>
                <IonItem color="light">
                    <IonLabel position="stacked" color="secondary">Username</IonLabel>
                    <IonInput name="username" type="text" value={username} onIonChange={e => setUsername(e.detail.value!)}></IonInput>
                </IonItem>

                {formSubmitted && usernameError && 
                    <IonText color="danger">
                        <p className="ion-padding-start">Unsername is required</p>
                    </IonText>}
                
                <IonItem color="light">
                    <IonLabel position="stacked" color="secondary">Password</IonLabel>
                    <IonInput name="username" type="text" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                </IonItem>
 
                {formSubmitted && passwordError && 
                    <IonText color="danger">
                        <p className="ion-padding-start">Password is required</p>
                    </IonText>}
                
                <IonRow>
                    <IonCol>
                        <IonButton color="light" type="submit" expand="block">Login</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton color="light" onClick={onToggle} expand="block">Singup</IonButton>
                    </IonCol>
                </IonRow>
 
            </IonList>
        </form>
    )
}

export default LoginForm;