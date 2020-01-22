import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NavBar from './components/NavBar/NavBar';
import About from './pages/About/About';
import BattleField from './pages/Battlefield/BattleField';
import HuntingPlaces from './pages/HuntingPlaces/HuntingPlaces';
import Home from './pages/Home/Home';
import CharCreation from './pages/CharCreation/CharCreation';
import MainContext from './contexts/MainContext.js';
import Talents from './pages/Talents/Talents';
import Depot from './pages/Depot/Depot';
import Shop from './pages/Shop/Shop';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [charId, setCharId] = useState(null);
  const [charInfo, setCharInfo] = useState(null);
  const [charSlots, setCharSlots] = useState(null);
  const [characterAttack, setCharacterAttack] = useState(null);
  const [monsterAttack, setMonsterAttack] = useState(null);
  
  return (
    <Router>
      <MainContext.Provider value={{ token, setToken, userId, setUserId, userInfo, setUserInfo, charId, setCharId, charInfo, setCharInfo, charSlots, setCharSlots, characterAttack, setCharacterAttack, monsterAttack, setMonsterAttack }}>
        <div className="App">
          <NavBar />
          <Switch>
            {!token && ([
              <Redirect exact from="/" to='/login' key='0'/>,
              <Route path="/login" component={Login} key='1'/>,
              <Route path="/register" component={Register} key='2'/>,
              <Route path="/about" component={About} key='3'/>,
              <Redirect from='*' to='/login' key='4'/>
            ])}
            {token && !charId && ([
              <Redirect exact from="/" to='/home' key='0'/>,
              <Redirect exact from="/login" to='/home' key='1'/>,
              <Route path='/home' component={Home} key='2'/>,
              <Route path='/charcreation' component={CharCreation} key='3'/>,
              <Route path="/about" component={About} key='4'/>,
              <Redirect from='*' to='/home' key='5'/>
            ])}
            {token && charId && ([
              <Redirect exact from="/" to='/home' key='0'/>,
              <Route path='/home' component={Home} key='1'/>,
              <Route path='/charcreation' component={CharCreation} key='2'/>,
              <Route path='/huntingplaces' component={HuntingPlaces} key='3'/>,
              <Route path="/battlefield" component={BattleField} key='4'/>,
              <Route path="/about" component={About} key='5'/>,
              <Route path="/talents" component={Talents} key='6'/>,
              <Route path="/depot" component={Depot} key='7'/>,
              <Route path="/shop" component={Shop} key='8'/>,
              <Redirect from='*' to='/home' key='8'/>
            ])}
            {/* <Redirect exact from="/" to='/login' />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Route path="/battlefield" component={BattleField} />
            <Route path='/huntingplaces' component={HuntingPlaces} />
            <Route path='/home' component={Home} />
            <Route path='/charcreation' component={CharCreation} />
            <Redirect from='*' to='/login' /> */}
          </Switch>
        </div>
      </MainContext.Provider>
    </Router>
  );
}

export default App;
