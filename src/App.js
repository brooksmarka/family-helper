import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import List from './List';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/list/:slug' element={<List />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;