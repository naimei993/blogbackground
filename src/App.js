
import { BrowserRouter} from 'react-router-dom';
import {Route,Routes,} from 'react-router'
import './App.css';
import Admin from './components/admin/admin'
import Login from './components/login/login'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/" element={<Login/>}/>
        </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
