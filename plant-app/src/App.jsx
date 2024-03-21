
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Plants from '../src/plants.jsx';
import Plant from '../src/plant.jsx';
const product_id = window.location.href.split("/");
console.log(product_id[4])
function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/planten" element={<Plants />}>
        </Route>

        <Route path={"/planten/" + product_id[4]}  element={<Plant />}>

        </Route>
      </Routes>
      </Router>
      <a href="/planten"> planten</a>
      <ul>

      </ul>
    </div>
  )
}
export default App