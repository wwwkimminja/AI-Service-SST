import { useNavigate } from 'react-router-dom';
import './App.css';
import heroImage from './assets/images/hero-image.png';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/start')}>GET STARTED</button>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={heroImage} alt="hero-image" />
      </div>
    </>
  );
}

export default App;
