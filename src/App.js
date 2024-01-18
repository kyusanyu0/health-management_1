import './App.css';
import Calendar from './components/Calendar'
import HealthRegister from './components/HealthRegister';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/health-register" element={<HealthRegister />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;

