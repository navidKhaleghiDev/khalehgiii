import { useState } from 'react';
import { Card, Typography } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { SettingMalwareCard } from '@src/pages/Dashboard/SettingsMalware/SettingMalwareCard';

export function LicenseTableBody({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  const renderComponent = (item) => {
    const components = {
      none: <div>{item.name}</div>,
      sandbox: <SettingMalwareCard />,
    };

    return components[item.name ?? 'none'];
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
          {item.activeNumbers}
        </Typography>
        <Typography
          variant="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase flex justify-center"
        >
          <IconButton
            icon={isOpen ? PhCaretUpBold : PhCaretDownBold}
            onClick={toggleAccordion}
          />
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
