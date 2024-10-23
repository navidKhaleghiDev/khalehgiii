import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';

import { BaseButton, Typography } from '@redesignUi/atoms';
import { useLanguage } from '@context/settings/languageContext';

import { BaseTabProps, BaseTabsProps } from './types';

export function BaseTab({ children, className }: BaseTabProps): JSX.Element {
  return <div className={className}>{children}</div>;
}

const BaseTabs = forwardRef(
  ({ children, label, className }: BaseTabsProps, ref): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const { lang } = useLanguage();

    const rtlRadius = lang === 'en' ? 'rounded-tl-md' : 'rounded-tr-md';

    const validTabs = React.Children.toArray(children).filter(
      (child) => child !== null
    );

    useEffect(() => {
      if (activeTab >= validTabs.length) {
        setActiveTab(0);
      }
    }, [activeTab, validTabs.length]);

    useImperativeHandle(ref, () => ({
      changeTab: (index: number) => {
        if (index >= 0 && index < validTabs.length) {
          setActiveTab(index);
        }
      },
      getActiveTab: () => activeTab,
    }));

    return (
      <div className={`flex flex-col w-full ${className}`}>
        {label && (
          <Typography color="teal" variant="h4">
            {label}
          </Typography>
        )}
        <div className="flex">
          {validTabs.map((child, index) => {
            if (React.isValidElement<BaseTabProps>(child)) {
              const { label: propsLabel } = child.props;
              return (
                <BaseButton
                  className={`${index === 0 && rtlRadius} ${
                    index === validTabs.length - 1 && rtlRadius
                  } ${
                    index === activeTab
                      ? 'border-b-2 border-teal-500 text-teal-500 hover:text-teal-500 rounded-none'
                      : ''
                  }`}
                  label={propsLabel}
                  type="tertiary"
                  key={propsLabel}
                  onClick={() => setActiveTab(index)}
                />
              );
            }
            return null;
          })}
        </div>
        <div className="w-full py-5 border-gray-200 border-t-[0.06rem]">
          {validTabs[activeTab]}
        </div>
      </div>
    );
  }
);

BaseTabs.displayName = 'BaseTabs';

export { BaseTabs };
