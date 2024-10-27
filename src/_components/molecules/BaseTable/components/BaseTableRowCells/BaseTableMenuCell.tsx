import { BaseButton, IconButton } from '@redesignUi/atoms/BaseButton';
import ToolTip from '@redesignUi/atoms/Tooltip';
import { useCallback, useState, useRef } from 'react';

import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { useLanguage } from '@context/settings/languageContext';
import { useTranslation } from 'react-i18next';

import moreIcon from '@iconify-icons/ph/dots-three-vertical-bold';
import {
  ActionCellFunction,
  ActionItem,
  BaseTableActionCellProps,
  IdItem,
} from '../../types';
import { baseTableMenuCell } from '../../styles';

export function BaseTableMenuCell<T extends IdItem>(
  props: BaseTableActionCellProps<T>
) {
  const { row, header, onClick } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { isFarsi } = useLanguage();
  const { t } = useTranslation();

  useClickOutside({ ref, setValue: setOpen, value: open });

  const menuStyle = isFarsi ? 'left-0' : 'right-0';

  const MenuComponent = useCallback(
    ({ menu }: ActionCellFunction) => (
      <IconButton
        key={row.id}
        icon={menu.icon || moreIcon}
        color="neutralNoBg"
        size={menu.size}
        onClick={() => setOpen((prev) => !prev)}
      />
    ),
    [onClick, row]
  );

  return (
    header?.menu && (
      <div ref={ref} className="flex">
        {header.tooltip ? (
          <ToolTip tooltip={t(header.tooltip)}>
            <MenuComponent menu={header} />
          </ToolTip>
        ) : (
          <MenuComponent menu={header} />
        )}

        {open && (
          <div
            className={` z-20 absolute top-7 ${menuStyle}  bg-white border border-gray-200 rounded-lg shadow w-[200px] flex-col `}
          >
            {header.menu.map((action: ActionItem) => (
              <div className="mb-1" key={action.action}>
                <div className="bg-white rounded-lg h-auto flex w-full ">
                  <BaseButton
                    className={baseTableMenuCell({
                      color: action.color,
                    })}
                    type="neutral"
                    startIcon={action.icon}
                    label={action.title}
                    onClick={
                      onClick ? () => onClick(action.action, row) : undefined
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}
