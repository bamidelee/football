import { useState, useEffect, useContext } from 'react';
import './App.css';
import DashBoard from './components/dashboard';
import {
  HashRouter,
   Routes,
   Route,
 } from "react-router-dom";
 import Layout from "./layout.js";
 import Fixtures from './components/fixtures';
 import Standings from './components/standings';
import News from './components/news';
import Results from './components/results';


function App() {


  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element= {<Layout/>}>
          <Route index element={<DashBoard/>}/>
          <Route path= 'fixtures' element={<Fixtures/>}/>
          <Route path='standings' element= {<Standings/>}/>
          <Route path = 'news' element={<News/>}/>
          <Route path='results' element={<Results/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
