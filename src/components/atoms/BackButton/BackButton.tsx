import { useNavigate } from 'react-router-dom';
import arrowLineLeft from '@iconify-icons/ph/arrow-line-left';

import { BaseButton, IconButton } from '../BaseButton';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { Icons } from 'react-toastify';

export type BackButtonProps = {
	withLabel?: boolean;
	onClick?: () => void;
	className?: string;
};

export function BackButton({ withLabel, onClick, className }: BackButtonProps) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { lang } = useLanguage();

	const config = {
		endIcon: lang === 'fa' ? arrowLineLeft : 'null',
		startIcon: lang === 'en' ? arrowLineLeft : 'null',
	};

	const handleClick = () => {
		if (!onClick) {
			navigate(-1);
		} else {
			onClick();
		}
	};

	return !withLabel ? (
		<IconButton
			onClick={handleClick}
			icon={arrowLineLeft}
			size="xl"
			type="button"
			color="teal"
			className={className}
		/>
	) : (
		<BaseButton
			label={t('global.pageBack')}
			onClick={handleClick}
			className={className}
			{...config}
		/>
	);
}
