import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'auth.login': 'Login',
          'auth.email': 'Email',
          'auth.password': 'Password',
          'auth.login_failed': 'Login failed. Please check your credentials.',
          'auth.network_error': 'Network error. Please try again.',
          'app.title': 'Hebrew Tutor AI',
        },
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;