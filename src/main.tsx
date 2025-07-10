import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Application starting...');

// Check if localStorage is accessible
try {
  localStorage.setItem('test', 'test');
  const test = localStorage.getItem('test');
  console.log('localStorage is working:', test === 'test');
  localStorage.removeItem('test');
} catch (e) {
  console.error('localStorage is not accessible:', e);
}

// Check for existing token
const token = localStorage.getItem('token');
console.log('Initial token state:', token ? 'exists' : 'not found');

createRoot(document.getElementById("root")!).render(<App />);

console.log('Application rendered');
