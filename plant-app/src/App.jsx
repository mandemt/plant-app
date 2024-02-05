
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Plants from '../src/plants.jsx';

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/planten" element={<Plants />}>
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