import { Suspense, useMemo, useState, } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routesConfig from '@src/routes/routesConfig';
import { UserContext } from '@context/user/userContext';
import { IUser } from './services/users/types';
import { useLanguage } from '@context/settings/languageContext';

const router = createBrowserRouter(routesConfig);

function App() {
	const [user, setUser] = useState<IUser | null>(null);
	const { dir, lang } = useLanguage();

	const userValue = useMemo(() => ({ user, setUser }), [user]);

	return (
		<UserContext.Provider value={userValue}>
			<div dir={dir}>
				<Suspense>
					<RouterProvider router={router} />
				</Suspense>
				<ToastContainer rtl={lang === 'fa'} style={{ direction: dir, fontSize: 20 }} />
			</div>
		</UserContext.Provider>
	);
}

export default App;
