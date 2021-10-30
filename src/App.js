import './App.css';
import './AppM.css';

import {React, useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {data} from './data';

import Home from './component/presentation/Home.js';
import searchArea from './component/presentation/FindArea';
import Restaurant_list from './component/presentation/Restaurant_list';
import Restaurant_result from './component/presentation/Restaurant_result.js';
import Attraction_list from './component/presentation/Attraction_list';
import Attraction_result from './component/presentation/Attraction_result';
import Mosque_list from './component/presentation/Mosque_list';
import Mosque_result from './component/presentation/Mosque_result';
import FindArea from './component/presentation/FindArea';

function App() {
    const {i18n} = useTranslation();
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        if (i18n.language === 'kr') {
            setAllData(data.kr);
        } else {
            setAllData(data.en);
        }
    }, [i18n.language]);

    return (
        <Route>
            <Switch>
                <Route path="/" component={Home} exact={true} i18n={i18n}/>
                <Route path="/search" component={searchArea}/>
                <Route path='/restlist' component={Restaurant_list}/>
                <Route path="/restres" component={Restaurant_result}/>
                <Route path="/attrlist" component={Attraction_list}/>
                <Route path="/attrres" component={Attraction_result}/>
                <Route path="/mosqlist" component={Mosque_list}/>
                <Route path="/mosqres" component={Mosque_result}/>
            </Switch>
        </Route>
    );
}

export default App;