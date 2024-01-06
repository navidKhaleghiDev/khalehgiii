import { IconButton } from '@ui/atoms/BaseButton';
import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import { IDaAs } from '@src/services/users/types';

export function ButtonLockAction({ user, onclick }) {
	const updatedUnlock: IDaAs = {
		...(user as IDaAs),
		is_lock: !user.is_lock,
	};
	return (
		<>
			<IconButton
				icon={user.is_lock ? lockKeyFillIcon : lockKeyOpenFillIcon}
				color={user.is_lock ? 'redNoBg' : 'tealNoBg'}
				onClick={() => onclick('editLock', updatedUnlock)}
			/>
		</>
	);
}
