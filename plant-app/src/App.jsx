
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Plants from '../src/plants.jsx';
import Plantenmap from '../src/plantenmap.jsx';
import './typografie.scss';
import AddPlants from '../src/addplants.jsx';

import Plant from '../src/plant.jsx';
import Properties from './properties.jsx';
import Property from './property.jsx'
import PropertyList from './propertylist.jsx'
import Calculate from './calculate.jsx'


function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/planten" element={<Plants title="Planten ontdekken" />}>
          </Route>
          <Route path="/plantenmap" element={<Plantenmap title="plantenmap" />}>
          </Route>
          <Route path="/addplanten" element={<AddPlants title="planten toevoegen" />}>
          </Route>
          <Route path={"/planten/:id"} element={<Plant />}>

          </Route>
          <Route path={"/kenmerken"} element={<Properties title="Plantkenmerken" />}>
          </Route>

          <Route path={"/kenmerken/:id"} element={<Property />}>
          </Route>
          <Route path={"/kenmerken/:id/:id"} element={<PropertyList />}>
          </Route>
          <Route path={"/rekenen"} element={<Calculate />}>
          </Route>


        </Routes>
      </Router>

       <a href="/planten"> planten</a> 
      <a href="/kenmerken"> kenmerken</a>
      <nav> 
        <ul>
 
     <li> <a href="/plantenmap"> plantenmap</a></li>

          <li>Ontdekken</li>
          <li>Terug</li>
        </ul>
      </nav>
    </div>
  )
}
export default App