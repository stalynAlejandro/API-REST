import React from 'react';
import './ExploreContainer.css';
import { IonButton } from '@ionic/react';

// Contenido de la página principal.
const ExploreContainer: React.FC = () => {
  return (
    <div className="container">
      <strong>Create your tasks</strong>
        <p>
          Regain clarity and calmness by getting all those tasks
          out of your head and onto your BoardTimeApp.
        </p>
      <IonButton routerLink="/login" color="light" expand="block">Start Now</IonButton>
    </div>
  );
};

export default ExploreContainer;