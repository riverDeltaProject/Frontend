import './App.css';

import React from 'react';
import { Route } from 'react-router-dom';

import Home from './component/presentation/Home.js';
import Restaurant from './component/presentation/Restaurant';

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/restaurant" component={Restaurant} />
    </div>
  );
}

export default App;
