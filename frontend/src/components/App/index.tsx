import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import SurveyPage from '../SurveyPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surveys/:code" element={<SurveyPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
