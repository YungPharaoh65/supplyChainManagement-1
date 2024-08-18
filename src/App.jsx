import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import TrackTrace from "./components/TrackTrace/TrackTrace";
import Sales from './Sales';
import Details from './Functiona/Details/details';
import Dashboard from './Functiona/dashboard/dashboard';
 
const App = () => {
  return (
    <> 
      <Routes>
        <Route path="/" element={<Home/>} />        
        <Route path="/TrackTrace" element={<TrackTrace/>} />
        <Route path="/sales" element={<Sales/>}/> 
        <Route path="/details" element={<Details/>}/>  
        <Route path="/dashboard" element={<Dashboard/>}/>  
        
      </Routes>
    </>
    
  );
}

export default App;
