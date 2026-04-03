import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/*
Apply the correct theme before React renders, so users do not see a flash of the wrong mode.
Reads persisted state from localStorage.
Updates html/body theme classes and colors before app mount.
*/
const initializeDarkMode = () => {
  try {
    // We read the current storage key and keep support for the old one so existing users keep their settings.
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
      // If dark mode was saved previously, we apply dark styles on first paint.
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

// Ensure first paint already matches saved theme.
initializeDarkMode();

// Mount the full React application into the page.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
