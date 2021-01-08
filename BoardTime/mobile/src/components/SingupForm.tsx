import React, { useState } from 'react'
import { IonList, IonItem, IonLabel, IonInput, IonText, IonRow, IonCol, IonButton } from '@ionic/react';
const SingupForm = ({onToggle} : any) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const singup = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitted(true)
        if (!username) setUsernameError(true)
        if (!email) setEmailError(true)
        if (!password) setPasswordError(true)
        if (username && email && password) {
            setUsernameError(false)
            setEmailError(false)
            setPasswordError(false)
            console.log('SING UP')
        }
    }

    return (
        <form id="login-container" noValidate onSubmit={singup}>
            <IonList>

                <IonItem color="light">
                    <IonLabel position="stacked" color="secondary">Email</IonLabel>
                    <IonInput name="email" type="text" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                </IonItem>

                {formSubmitted && emailError &&
                    <IonText color="danger">
                        <p className="ion-padding-start">Email is required</p>
                    </IonText>}

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
                        <IonButton color="light" onClick={onToggle} expand="block">Go Back</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton color="light" type="submit" expand="block">Singup</IonButton>
                    </IonCol>
                </IonRow>

            </IonList>
        </form>
    )
}

export default SingupForm
