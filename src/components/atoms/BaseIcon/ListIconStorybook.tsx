import { Icon, IconifyIcon } from '@iconify/react';

import { baseIconStyles } from './styles';
import { BaseIconProps } from './types';

export interface IconListStorybookProps {
  color: BaseIconProps['color'];
  size: 'sm' | 'md' | 'lg';
  hoverColor: 'default' | 'primary';
  className?: string;
  icons: (string | IconifyIcon)[];
  title: string[];
}

/**
 * This function is used exclusively for Storybook to display a consolidated list of icons and is not used elsewhere in the application.
 * @param {color, size, hoverColor, className, icons}
 * @returns {JSX.Element}
 */
export function IconListStorybook(props: IconListStorybookProps): JSX.Element {
  const {
    color,
    size,
    hoverColor,
    className,
    icons = ['fa:home'],
    title,
  } = props;
  return (
    <div className="flex flex-wrap space-4 w-full justify-between">
      {icons.map((icon, indexKey) => (
        <div
          className="flex flex-col items-center p-2.5 bg-gray-100 rounded-lg m-2"
          title={title[indexKey]}
          key={title[indexKey]}
        >
          <Icon
            className={baseIconStyles({ size, color, hoverColor, className })}
            icon={icon}
          />
        </div>
      ))}
    </div>
  );
}
