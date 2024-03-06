import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Signup from './Components/Signup';
import './App.css'
import Login from './Components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
