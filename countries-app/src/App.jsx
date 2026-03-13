import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountryList from './Components/CountryList/CountryList.jsx'
import CountryPage from './Components/CountryPage/CountryPage.jsx'

import './Style.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CountryList/>} />
          <Route path='/country/:name' element={<CountryPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
