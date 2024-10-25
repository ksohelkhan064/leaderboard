import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
    <ToastContainer/>
  </AuthProvider>
)
