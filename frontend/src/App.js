
import './App.css';
import Login from './Components/Login/Login';

import Navbar from './Components/Navbar/Navbar';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
