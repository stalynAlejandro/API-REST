import React from 'react'
import './Dashboard.css'
import { IonPage, IonHeader, IonToolbar, IonContent, IonTitle} from '@ionic/react';

const Dashboard: React.FC = () => {

    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                <IonTitle>BoardTimeApp</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>

            </IonContent>
        </IonPage>
    )
}

export default Dashboard
