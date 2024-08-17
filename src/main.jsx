import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/react-fontawesome';
import { HashRouter as Router } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
);
