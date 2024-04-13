// Tabs.tsx
import React, { useState } from 'react';
import { useLanguage } from '@context/settings/languageContext';
import { IBaseTabProps, IBaseTabsProps } from './types';
import { Typography } from '../Typography';

export function BaseTab({ children }: IBaseTabProps): JSX.Element {
  return <div>{children}</div>;
}

export function BaseTabs({ children, label }: IBaseTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const { lang } = useLanguage();

  const radiusIndexOne = lang === 'en' ? 'rounded-tl-md' : 'rounded-tr-md';
  const radiusIndexLast = lang === 'fa' ? 'rounded-tl-md' : 'rounded-tr-md';

  const changeTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <Typography color="teal" size="h4">
          {label}
        </Typography>
      )}
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<IBaseTabProps>(child)) {
            const { label: propsLabel } = child.props;
            return (
              <button
                type="button"
                className={`uppercase px-4 py-2 ${
                  index === 0 && radiusIndexOne
                } ${
                  index === React.Children.toArray(children).length - 1 &&
                  radiusIndexLast
                } ${
                  index === activeTab
                    ? 'bg-teal-500 text-white dark:bg-cyan-900 dark:text-sky-500'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-slate-800 dark:text-white'
                }`}
                onClick={() => changeTab(index)}
              >
                <Typography size="body3">{propsLabel}</Typography>
              </button>
            );
          }
          return null;
        })}
      </div>
      <div className="w-full p-4 border-gray-200 border-2 rounded-md rounded-tr-none">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
}
