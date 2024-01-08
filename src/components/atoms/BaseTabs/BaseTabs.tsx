// Tabs.tsx
import React, { useState } from 'react';
import { IBaseTabProps, IBaseTabsProps } from './types';
import { Typography } from '../Typography';
import { useLanguage } from '@context/settings/languageContext';

export const BaseTab: React.FC<IBaseTabProps> = ({ children }) => {
  return <>{children}</>;
};

export const BaseTabs: React.FC<IBaseTabsProps> = ({ children, label }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { lang } = useLanguage();

  const radiusIndexOne = lang === 'en' ? 'rounded-tl-md' : 'rounded-tr-md';
  const radiusIndexLast = lang === 'fa' ? 'rounded-tl-md' : 'rounded-tr-md';

  const changeTab = (index: number) => {
    setActiveTab(index);
  };

  console.log(lang);

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
            const { label } = child.props;
            return (
              <button
                className={`uppercase px-4 py-2 ${
                  index === 0 && radiusIndexOne
                } ${
                  index === React.Children.toArray(children).length - 1 &&
                  radiusIndexLast
                } ${
                  index === activeTab
                    ? 'bg-teal-500 text-white'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => changeTab(index)}
              >
                <Typography size="body3">{label}</Typography>
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
};
