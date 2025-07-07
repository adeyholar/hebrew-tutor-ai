import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';
import Login from './components/Auth/Login';

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <h1>{t('app.title')}</h1>
      </header>
      <main>
        <Login />
      </main>
    </div>
  );
};

export default App;