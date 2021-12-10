
import { BrowserRouter,Navigate} from 'react-router-dom';
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
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/" element={<Navigate to="/admin/home" />}/>
          <Route
            path="*"
            element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
        </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
