import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import SurveyPage from '../SurveyPage';
import NotFound from '../NotFound';
import Layout from '../Layout';
import './App.css';

function App() {
  console.log(process.env.REACT_APP_BASE_URL);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/surveys/:code" element={<SurveyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
