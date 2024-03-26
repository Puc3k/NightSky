import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-indigo-500 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-16 inline" /> <span className='text-2xl text-white align-middle font-bold'>NightSky</span>
      </Link>
      <Link to="/create-post" className="font-inter font-medium bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md">Generuj</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-white min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;