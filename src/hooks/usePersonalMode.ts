import { useState, useEffect } from 'react';

const STORAGE_KEY = 'will-pro-ai-personal-mode';

export const usePersonalMode = () => {
  const [isPersonalMode, setIsPersonalMode] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsPersonalMode(true);
    }
  }, []);

  const activatePersonalMode = () => {
    setIsPersonalMode(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const deactivatePersonalMode = () => {
    setIsPersonalMode(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    isPersonalMode,
    activatePersonalMode,
    deactivatePersonalMode,
  };
};