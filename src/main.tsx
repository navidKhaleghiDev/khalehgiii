// import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
// import { LanguageProvider } from '@context/settings/languageContext';
// import { ThemeProvider } from '@context/settings/themeContext';
// import App from './App';
import { IconToggleSwitch } from '@redesignUi/organisms/Navbar/ListMenu/IconToggleSwitch/IconToggleSwitch';

import './i18next';
import './App.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //   <ThemeProvider>
  //     <LanguageProvider>
  //       <App />
  //     </LanguageProvider>
  //   </ThemeProvider>
  // </React.StrictMode>
  <>
    {/* <NavbarDashboard darkMode /> */}
    <IconToggleSwitch
      id="1"
      name="test"
      onChange={() => console.log('first')}
    />
  </>
);
