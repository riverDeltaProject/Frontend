import './App.css';

import React from 'react';
import { Route } from 'react-router-dom';

import Home from './component/presentation/Home.js';
import Restaurant from './component/presentation/Restaurant';
import Restaurant_list from './component/presentation/Restaurant_list';
import Restaurant_result from './component/presentation/Restaurant_result.js';

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/restaurant" component={Restaurant} />
      <Route path='/restaurant_list' component={Restaurant_list} />
      <Route path="/restaurant_result" component={Restaurant_result} />
    </div>
  );
}

export default App;
