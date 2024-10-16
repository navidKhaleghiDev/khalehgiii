import { useLanguage } from '@context/settings/languageContext';
import { BaseIcon, Typography } from '@redesignUi/atoms';
import PhCaretLeft from '@iconify-icons/ph/caret-left';
import PhCaretRight from '@iconify-icons/ph/caret-right';
import PhCaretDown from '@iconify-icons/ph/caret-down';
import PhHouseSimpleDuotone from '@iconify-icons/ph/house-simple-duotone';

import { MenuItemAccordionProps } from './types';
import { NavigationProps } from '../types';
import { MenuItem } from '../MenuItem/Menu';
import { menuItemStyles } from '../MenuItem/styles';

/**
 * This component renders an accordion-style menu item that can be expanded or collapsed.
 * @param {MenuItemAccordionProps} props - The props for the MenuItemAccordion component.
 * @param {number} props.open - The index of the currently open accordion item, or null if none are open.
 * @param {React.Dispatch<React.SetStateAction<number | null>>} props.setOpen - Function to set the index of the open accordion item.
 * @param {number} props.index - The index of this accordion item.
 * @param {NavigationProps} props.item - The navigation item data for this accordion item.
 * @param {string} props.pathname - The current pathname for determining active states.
 * @param {string} props.icon - The icon to display for this accordion item.
 * @param {boolean} [props.collapsed=false] - Indicates if the menu item is collapsed by default.
 *
 * @returns {JSX.Element} The rendered MenuItemAccordion component.
 */

export function MenuItemAccordion(props: MenuItemAccordionProps): JSX.Element {
  const {
    open,
    setOpen,
    index,
    item,
    pathname,
    icon = PhHouseSimpleDuotone,
    collapsed,
  } = props;
  const { lang } = useLanguage();
  const iconDirection = lang === 'fa' ? PhCaretLeft : PhCaretRight;
  const isParentPath = pathname.split('/')[1] || 'false';

  return (
    <div>
      <button
        type="button"
        className={menuItemStyles({
          active: item.path === `/${isParentPath}`,
        })}
        onClick={() => setOpen(open === index ? null : index)}
      >
        <div className="flex items-center">
          <BaseIcon icon={icon} className="w-6 h-6" />
          {!collapsed && (
            <Typography className="mx-2" variant="body5">
              {item.label}
            </Typography>
          )}
        </div>
        <BaseIcon icon={open === index ? PhCaretDown : iconDirection} />
      </button>
      <div className={`${open !== index && 'hidden'}`}>
        {item.items?.map((i: NavigationProps) => (
          <MenuItem
            key={i.id}
            item={i}
            pathname={pathname}
            isChildren
            collapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );
}
