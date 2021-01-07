import React from 'react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <strong>Create your tasks</strong>
        <p>
          Regain clarity and calmness by getting all those tasks
          out of your head and onto your BoardTimeApp.
        </p>
      <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">Start Now</a>
    </div>
  );
};

export default ExploreContainer;
