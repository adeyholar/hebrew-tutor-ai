import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: email, password }).toString(),
      });
      if (response.ok) {
        const { access_token } = await response.json();
        localStorage.setItem('token', access_token);
        window.location.href = '/lesson'; // Placeholder redirect
      } else {
        setError(t('auth.login_failed'));
      }
    } catch (err) {
      setError(t('auth.network_error'));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('auth.login')}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder={t('auth.email')}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder={t('auth.password')}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {t('auth.login')}
        </button>
      </form>
    </div>
  );
};

export default Login;