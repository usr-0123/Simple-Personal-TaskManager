import React from 'react';
import New from './pages/New';
import Tasks from './pages/Tasks';

import './App.scss'

const App = () => {
  return (
    <div className='app'>
      <New />
      <Tasks />
    </div>
  );
};

export default App;
