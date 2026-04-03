import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize dark mode from localStorage before React renders to prevent flash
const initializeDarkMode = () => {
  try {
    const newStorageKey = 'nexvest-finance-storage';
    const oldStorageKey = 'zorvyn-finance-storage';
    let storedState = localStorage.getItem(newStorageKey);

    // Backward compatibility: migrate old branded storage key once.
    if (!storedState) {
      const legacyState = localStorage.getItem(oldStorageKey);
      if (legacyState) {
        localStorage.setItem(newStorageKey, legacyState);
        storedState = legacyState;
      }
    }

    if (storedState) {
      const state = JSON.parse(storedState);
      if (state.state && state.state.darkMode) {
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#111827';
        document.body.style.color = '#f3f4f6';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.style.backgroundColor = '#f9fafb';
        document.body.style.color = '#111827';
      }
    } else {
      // Default to light mode
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f9fafb';
      document.body.style.color = '#111827';
    }
  } catch (e) {
    console.error('Error initializing dark mode:', e);
  }
};

initializeDarkMode();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
