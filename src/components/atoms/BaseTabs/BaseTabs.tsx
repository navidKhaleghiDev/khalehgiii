import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useLanguage } from '@context/settings/languageContext';
import { IBaseTabProps, IBaseTabsProps } from './types';
import { Typography } from '../Typography';

export function BaseTab({ children, className }: IBaseTabProps): JSX.Element {
  return <div className={className}>{children}</div>;
}

const BaseTabs = forwardRef(
  ({ children, label, className }: IBaseTabsProps, ref): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const { lang } = useLanguage();

    const radiusIndexOne = lang === 'en' ? 'rounded-tl-md' : 'rounded-tr-md';
    const radiusIndexLast = lang === 'fa' ? 'rounded-tl-md' : 'rounded-tr-md';

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
            if (React.isValidElement<IBaseTabProps>(child)) {
              const { label: propsLabel } = child.props;
              return (
                <button
                  type="button"
                  key={propsLabel}
                  className={`uppercase px-4 py-2 ${
                    index === 0 && radiusIndexOne
                  } ${index === validTabs.length - 1 && radiusIndexLast} ${
                    index === activeTab
                      ? 'bg-teal-500 text-white dark:bg-cyan-900 dark:text-sky-500'
                      : 'bg-neutral-100 text-neutral-600 dark:bg-slate-800 dark:text-white'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <Typography variant="body3">{propsLabel}</Typography>
                </button>
              );
            }
            return null;
          })}
        </div>
        <div className="w-full p-4 border-gray-200 border-2 rounded-md rounded-tr-none">
          {validTabs[activeTab]}
        </div>
      </div>
    );
  }
);

BaseTabs.displayName = 'BaseTabs';

export { BaseTabs };
