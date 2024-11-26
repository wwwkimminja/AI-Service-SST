import { useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import heroImage from './assets/images/hero-image.png';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header subHeading={'Let AI Create a Stunning Portrait of Your Pet'} />
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/start')}>GET STARTED</button>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={heroImage} alt="hero-image" />
      </div>
    </div>
  );
}

export default App;
