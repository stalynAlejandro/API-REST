import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import "@ionic/react/css/ionic.bundle.css";
import {IonApp, IonContent, IonHeader, IonToolbar,IonButton, IonTitle} from '@ionic/react';

function App() {
  const [state, setState] = useState(1);
  return (
    <IonApp>
      <IonHeader>
        <IonTitle>
          My App
        </IonTitle>
      </IonHeader>
      <IonContent>
        <h1>{state}</h1>
        <IonButton onClick={() => setState(state + 1)}>Increase</IonButton>
        <IonButton onClick={() => setState(state - 1)}>Decrease</IonButton>
      </IonContent>
    </IonApp>
 );
}

export default App;
