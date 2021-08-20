import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Home from './component/presentation/Home.js';
import Restaurant from './component/presentation/Restaurant';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Route path="/" component={Home} exact />
      <Route path="/restaurant" component={Restaurant} />
      </header>
    </div>
  );
}

export default App;
