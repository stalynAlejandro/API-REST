import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../data/dataApi';
import { loginUserData } from '../data/user/user.actions';
import { IonButton, IonCol, IonRow, IonText, IonList, IonItem, IonLabel, IonInput } from '@ionic/react';
import { useHistory } from 'react-router';
import './LoginForm.scss'

const LoginForm = ({onToggle} : any) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true)
        if (!email) setEmailError(true)
        if (!password) setPasswordError(true)
        if(email && password){
            setEmailError(false)
            setPasswordError(false)
            
            const response = await loginUser(email, password);

            if(response){
                dispatch(loginUserData(email, response.name, response.token))
                history.push('/dashboard')
            }
        }
    }

    return (
        <form id="login-container" noValidate onSubmit={login}>
            <IonList>
                <IonItem color="light">
                    <IonLabel position="stacked" color="secondary">Email</IonLabel>
                    <IonInput name="username" type="text" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                </IonItem>

                {formSubmitted && emailError && 
                    <IonText color="danger">
                        <p className="ion-padding-start">Email is required</p>
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
                        <IonButton color="light"   type="submit" expand="block">Login</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton color="light"  onClick={onToggle} expand="block">Singup</IonButton>
                    </IonCol>
                </IonRow>
 
            </IonList>
        </form>
    )
}

export default LoginForm;