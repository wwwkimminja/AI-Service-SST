import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Order from './pages/Order/Order';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import PaymentFail from './pages/PaymentFail/PaymentFail';
import Status from './pages/Status/Status';
import See from './pages/See/See';
import Start from './pages/start/Start';
import Layout from './components/Layout/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/start" element={<Start />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-fail" element={<PaymentFail />} />
        <Route path="/status" element={<Status />} />
        <Route path="/see" element={<See />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
