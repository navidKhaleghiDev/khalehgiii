import React, { useEffect } from 'react';
import { useGlobals } from '@storybook/preview-api';

export const ModeDecorator = (Story: any) => {
  const [{ scheme }, updateGlobals] = useGlobals();

  useEffect(() => {
    if (scheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [scheme]);

  const toggleMode = () => {
    const newScheme = scheme === 'light' ? 'dark' : 'light';
    updateGlobals({ scheme: newScheme });
  };

  return (
    <>
      <button
        onClick={toggleMode}
        style={{
          display: 'none',
        }}
      >
        {scheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Story />
    </>
  );
};
