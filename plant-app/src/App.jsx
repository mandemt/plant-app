
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Plants from '../src/plants.jsx';
import Plant from '../src/plant.jsx';
import Properties from './properties.jsx';
import Property from './property.jsx'
function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/planten" element={<Plants />}>
        </Route>

        <Route path={"/planten/:id"}  element={<Plant />}>

        </Route>
        <Route path={"/kenmerken"}  element={<Properties />}>
        </Route>

        <Route path={"/kenmerken/:id"}  element={<Property />}>
        </Route>


    
      </Routes>
      </Router>
      <a href="/planten"> planten</a>
      <a href="/kenmerken"> kenmerken</a>

      <ul>

      </ul>
    </div>
  )
}
export default App