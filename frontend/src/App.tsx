import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';
import Login from './components/Auth/Login';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isRtl, setIsRtl] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    setIsRtl(newLang === 'he');
  };

  return (
    <div className="App" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="bg-gray-800 text-white p-4">
        <h1>{t('app.title')}</h1>
        <button onClick={toggleLanguage} className="ml-4 bg-blue-500 text-white p-1 rounded">
          {t('auth.login') === 'Login' ? 'עברית' : 'English'}
        </button>
      </header>
      <main>
        <Login />
      </main>
    </div>
  );
};

export default App;