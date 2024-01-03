import { Avatar } from '@ui/atoms/Avatar';
import { BaseButton } from '@ui/atoms/BaseButton';
import { useNavigate } from 'react-router-dom';
import { BaseInput, regexPattern } from '@ui/atoms/Inputs';
import { Typography } from '@ui/atoms/Typography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { API_USERS_LOGIN, API_USERS_PROFILE } from '@src/services/users';
import { PasswordInput } from '@ui/atoms/Inputs/PasswordInput';
import { toast } from 'react-toastify';
import { STORAGE_KEY_REFRESH_TOKEN, http } from '@src/services/http';
import { useUserContext } from '@context/user/userContext';
import userIcon from '@iconify-icons/ph/user';
import signInBoldIcon from '@iconify-icons/ph/sign-in-bold';

import { ILoginFieldValues } from '../types';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { DropDownWithIcon } from '@ui/atoms/DropDownWithIcon';
import languageIcon from '@iconify-icons/ph/globe-thin';
import { languageOptions } from '@src/constants/optios';

export function LoginForm() {
	const [error, setError] = useState<string | null>(null);
	const [loadingButton, setLoadingButton] = useState(false);
	const { changeLanguage } = useLanguage();

	const { setUser } = useUserContext();
	const { t } = useTranslation();

	const navigate = useNavigate();
	const { control, handleSubmit } = useForm<ILoginFieldValues>({
		mode: 'onChange',
	});

	const handelGetProfile = async () => {
		await API_USERS_PROFILE()
			.then(({ data }) => {
				if (data.exceeded_usage) {
					navigate(ROUTES_PATH.unauthorized);
					return;
				}
				setUser(data);
				toast.success(t('global.successfullyLogedIn'));
				navigate(ROUTES_PATH.dashboard);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoadingButton(false);
			});
	};

	const handelSubmitForm = async ({ email, password }: ILoginFieldValues) => {
		setLoadingButton(true);
		await API_USERS_LOGIN({ email, password })
			.then(({ data }) => {
				localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, data.refresh_token);
				http.setAuthHeader(data.access_token, data.refresh_token);
				handelGetProfile();
			})
			.catch((err) => {
				console.log({ err });

				setError(err);
				setLoadingButton(false);
			});
	};

	return (
		<form
			onSubmit={handleSubmit(handelSubmitForm)}
			className="flex flex-col items-center w-full mt-auto ">
			<div className="absolute top-[-6rem]">
				<Avatar icon={userIcon} intent="grey" size="lg" />
			</div>
			<div className="absolute top-[1rem] right-[1rem] ">
				<DropDownWithIcon
					icon={languageIcon}
					name={'language'}
					size="ls"
					onSelect={(v) => changeLanguage(v)}
					options={languageOptions}
				/>
			</div>
			<Typography color="neutral" size="h5" className="mb-5">
				{t('login.loginTitle')}
			</Typography>

			{/* <div>
				<ul>
					{Object.keys(locales).map((locale) => (
						<li key={locale}>
							<button style={{ backgroundColor: 'green', fontSize: '2rem' }}>
								{locales[locale].title}
							</button>
						</li>
					))}
				</ul>
			</div> */}

			{error && (
				<Typography color="red" size="body3" className="mb-2">
					{error}
				</Typography>
			)}
			<div className="w-full flex flex-col items-center justify-end">
				<BaseInput
					fullWidth
					control={control}
					placeholder={t('global.userName')}
					rules={{
						required: regexPattern.required,
					}}
					id="email"
					name="email"
					endIcon={userIcon}
				/>
				<PasswordInput name="password" control={control} placeholder={t('global.password')} />
				<BaseButton
					label={t('login.login')}
					endIcon={signInBoldIcon}
					className="mt-8"
					loading={loadingButton}
					size="md"
					submit
					fullWidth
				/>
			</div>
		</form>
	);
}
