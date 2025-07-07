import React from 'react';
import ReactDOM from 'react-dom/client'; // Note: /client for React 18+
import './index.css'; // Make sure this path is correct
import App from './App'; // Assuming your main App component is in App.tsx
import './i18n'; // Keep your i18n import

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);