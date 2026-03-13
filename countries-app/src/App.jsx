import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDarkMode } from './hooks/useDarkMode.js';

import CountryList from './Components/CountryList/CountryList.jsx'
import CountryPage from './Components/CountryPage/CountryPage.jsx'

import './Style.css';

function App() {

  const {darkMode, toggleDarkMode} = useDarkMode();

  return (
      <BrowserRouter>

        <button onClick={toggleDarkMode} className="theme-btn">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      
        <Routes>
          <Route path='/' element={<CountryList/>} />  
          <Route path='/country/:name' element={<CountryPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
