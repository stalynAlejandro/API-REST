import React, { useState } from 'react';
import { IonPage, IonContent, IonIcon, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { arrowBackOutline, toggle } from 'ionicons/icons';
import LoginForm from '../components/LoginForm';
import SingupForm from '../components/SingupForm';
import './Login.scss';

// Pagin de Login, tiene dos componentes LoginForm y SingupForm, 
// para logearse o para crear una cuenta. 
const Login: React.FC = () => {

    // Con esta variable controlamos el componente a mostrar
    const [showFormSingup, setShowFormSingup] = useState(false)

    const toggleForm = () => {
        setShowFormSingup(!showFormSingup)
    }

    return (
        <IonPage id="login-page">
            <IonHeader>
                <IonToolbar>
                    <IonButton fill="clear" routerLink="/home">
                        <IonIcon icon={arrowBackOutline} />
                    </IonButton>
                    <IonTitle>{showFormSingup ? 'Singup' : 'LogIn'}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="form-container" color="secondary">
                {/* Según el formulario que necesitamos SingupForm o LoginForm */}
                {showFormSingup ? <SingupForm onToggle={toggleForm} /> : <LoginForm onToggle={toggleForm}/>}
            </IonContent>
        </IonPage>
    )
}

export default Login;