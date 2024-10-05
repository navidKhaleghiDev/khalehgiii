// Tabs.tsx
import React, { useState } from 'react';
import { IBaseTabProps, IBaseTabsProps } from './types';
import { Typography } from '../Typography';

// eslint-disable-next-line react/function-component-definition
export const BaseTab: React.FC<IBaseTabProps> = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

// eslint-disable-next-line react/function-component-definition
export const BaseTabs: React.FC<IBaseTabsProps> = ({ children, label }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <Typography color="teal" variant="h4">
          {label}
        </Typography>
      )}
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<IBaseTabProps>(child)) {
            const { label: labelTab } = child.props;
            return (
              <button
                type="button"
                className={`uppercase px-4 py-2 ${
                  index === 0 && 'rounded-tr-md'
                } ${
                  index === React.Children.toArray(children).length - 1 &&
                  'rounded-tl-md'
                } ${
                  index === activeTab
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => changeTab(index)}
              >
                <Typography variant="body3">{labelTab}</Typography>
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
