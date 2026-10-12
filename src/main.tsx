// Ensure window.fetch is writable and configurable in case any library or extension modifies it
try {
  let activeFetch = window.fetch;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get: () => activeFetch,
    set: (val) => {
      activeFetch = val;
    },
  });
} catch (e) {}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
