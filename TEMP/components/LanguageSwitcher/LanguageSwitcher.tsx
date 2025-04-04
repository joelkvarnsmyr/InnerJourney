// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import { FaGlobe } from 'react-icons/fa';
import styles from './LanguageSwitcher.module.css';

const Index: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const currentLocale = location.pathname.split('/')[1] === 'sv' ? 'sv' : 'en';

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'sv' : 'en';
    const newPath = location.pathname.replace(/^\/(en|sv)/, `/${newLocale}`);
    history.push(newPath);
  };

  return (
      <button
          className={styles.languageSwitcher}
          onClick={toggleLanguage}
          title={currentLocale === 'en' ? 'Switch to Swedish' : 'Byt till Engelska'}
      >
        <FaGlobe className={styles.icon} />
      </button>
  );
};

export default Index;