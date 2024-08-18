import { useState } from 'react';
import { Card, Typography } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { SettingMalwareCard } from '@src/pages/Dashboard/SettingsMalware/SettingMalwareCard';
import { LicenseFileType } from '@src/pages/Dashboard/SettingsMalware/type';
import { useTranslation } from 'react-i18next';

interface LicenseTableBodyProps {
  item: LicenseFileType;
}

type ComponentKey = 'none' | 'sandbox' | 'users';

type ComponentTypes = {
  [key in ComponentKey]: JSX.Element | null;
};
export function LicenseTableBody({ item }: LicenseTableBodyProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  function isValidName(name: string): boolean {
    return name === 'users' || name === 'sandbox';
  }

  const renderComponent = (list: LicenseFileType) => {
    const components: ComponentTypes = {
      users: (
        <div className="flex">
          <div className="px-3 w-3/12 text-center break-words uppercase flex-col">
            <Typography variant="body3" type="div">
              {t('license.concurrentNumbers')}
            </Typography>
            <Typography variant="body3" type="div">
              {list.concurrent}
            </Typography>
          </div>
          <div className="px-3 w-3/12 text-center break-words uppercase flex-col">
            <Typography variant="body3" type="div">
              {t('license.wholeNumbers')}
            </Typography>
            <Typography variant="body3" type="div">
              {list.number}
            </Typography>
          </div>
        </div>
      ),
      sandbox: <SettingMalwareCard />,
      none: null,
    };

    if (isValidName(item.name)) {
      return components[list.name as ComponentKey];
    }

    return null;
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Card
        color="neutral"
        className="flex h-10 items-center px-2 my-2 w-full text-neutral-600"
      >
        <Typography
          variant="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {item.name}
        </Typography>
        <Typography
          variant="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          <Circle id={item.license} />
        </Typography>
        <Typography
          variant="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {item.number}
        </Typography>
        <Typography
          variant="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {dateAndNumber(item.expiry)}
        </Typography>
        <Typography
          variant="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {`${item.active}/${item.number}`}
        </Typography>
        <Typography
          variant="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase flex justify-center"
        >
          {isValidName(item.name) && (
            <IconButton
              icon={isOpen ? PhCaretUpBold : PhCaretDownBold}
              onClick={toggleAccordion}
            />
          )}
        </Typography>
      </Card>
      {isOpen && (
        <Card
          color="neutral"
          className={`transition duration-150 ease-in-out ${
            isOpen ? 'max-h-40' : 'max-h-0'
          }`}
        >
          <Typography variant="body3" className="p-4">
            {renderComponent(item)}
          </Typography>
        </Card>
      )}
    </div>
  );
}
