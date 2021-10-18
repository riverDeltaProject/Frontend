import './App.css';
import './AppM.css';

import React from 'react';
import { Route } from 'react-router-dom';

import Home from './component/presentation/Home.js';
import searchArea from './component/presentation/FindArea';
import searchAreaEng from './component/presentation/FindAreaEng';
import Restaurant_list from './component/presentation/Restaurant_list';
import Restaurant_result from './component/presentation/Restaurant_result.js';
import Attraction_list from './component/presentation/Attraction_list';
import Attraction_result from './component/presentation/Attraction_result';
import Mosque_list from './component/presentation/Mosque_list';
import Mosque_result from './component/presentation/Mosque_result';

function App() {
  return (
    <div>
      <Route path="/" component={Home} exact />
      <Route path="/searcharea" component={searchArea} />
      <Route path="/searcheng" component={searchAreaEng} />
      <Route path='/restaurant_list' component={Restaurant_list} />
      <Route path="/restaurant_result" component={Restaurant_result} />
      <Route path="/attraction_list" component={Attraction_list}/>
      <Route path="/attraction_result" component={Attraction_result} />
      <Route path="/mosque_list" component={Mosque_list}/>
      <Route path="/mosque_result" component={Mosque_result}/>
    </div>
  );
}

export default App;
