import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/:id" exact element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
