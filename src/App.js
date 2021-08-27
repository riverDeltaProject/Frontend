import './App.css';

import React from 'react';
import { Route } from 'react-router-dom';

import Home from './component/presentation/Home.js';
import Restaurant from './component/presentation/Restaurant';
import Restaurant_list from './component/presentation/Restaurant_list';

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/restaurant" component={Restaurant} />
      <Route path='/restaurant_list' component={Restaurant_list} />
    </div>
  );
}

export default App;
