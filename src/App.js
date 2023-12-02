import './App.css';
import Calendar from './components/Calendar'
import HealthRegister from './components/HealthRegister';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        {/* <div className="App">
          <h1>login機能</h1>
          <Home />
        </div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/health-register" element={<HealthRegister />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
