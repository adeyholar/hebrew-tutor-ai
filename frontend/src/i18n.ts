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
          'auth.microphone_error': 'Microphone access denied or not found.',
          'app.title': 'Hebrew Tutor AI'
        },
      },
      he: {
        translation: {
          'auth.login': 'התחברות',
          'auth.email': 'אימייל',
          'auth.password': 'סיסמה',
          'auth.login_failed': 'ההתחברות נכשלה. אנא בדוק את פרטיך.',
          'auth.network_error': 'שגיאת רשת. אנא נסה שוב.',
          'auth.microphone_error': 'גישה למיקרופון נדחתה או לא נמצאה.',
          'app.title': 'מורה לעברית AI'
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