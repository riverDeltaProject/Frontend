import './App.css';

import React from 'react';
import { Route } from 'react-router-dom';

import Home from './component/presentation/Home.js';
import Restaurant from './component/presentation/Restaurant';
import Restaurant_list from './component/presentation/Restaurant_list';
import Restaurant_result from './component/presentation/Restaurant_result.js';
import Attraction from './component/presentation/Attraction';
import Attraction_list from './component/presentation/Attraction_list';
import Attraction_result from './component/presentation/Attraction_result';
import Mosque_list from './component/presentation/Mosque_list';

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/restaurant" component={Restaurant} />
      <Route path='/restaurant_list' component={Restaurant_list} />
      <Route path="/restaurant_result" component={Restaurant_result} />
      <Route path="/attraction" component={Attraction} />
      <Route path="/attraction_list" component={Attraction_list}/>
      <Route path="/attraction_result" component={Attraction_result} />
      <Route path="/mosque_list" component={Mosque_list}/>
    </div>
  );
}

export default App;
