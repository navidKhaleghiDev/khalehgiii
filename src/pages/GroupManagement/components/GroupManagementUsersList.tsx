import { useCallback, useRef, useState, useEffect } from 'react';
import userIcon from '@iconify-icons/ph/user';
import { useTranslation } from 'react-i18next';

import { Avatar, Typography } from '@redesignUi/atoms';
import { IDaAs } from '@src/services/users/types';
import { BaseCheckBox } from '@redesignUi/atoms/Inputs/BaseCheckBox';
import { GroupManagementDropDown } from './GroupManagementDropDown';
import { dropdownOptions } from '../GroupManagementEdit/constants/groupManagementHeaderItem';
import { GroupManagementUsersListProps } from '../types';

interface SelectedDataType {
  [key: string]: IDaAs[];
}

export function GroupManagementUsersList(props: GroupManagementUsersListProps) {
  const {
    memberData,
    countPage,
    currentPage,
    pageSize,
    isLoading,
    setCurrentPage,
    keyRef,
    selectedData,
    setSelectedData,
  } = props;

  const { t } = useTranslation();

  const [allMembers, setAllMembers] = useState<IDaAs[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const handleUpdateCheckbox = (item: IDaAs) => {
    const key = keyRef.current;
    const alternativeKey = key === 'users' ? 'admins' : 'users';

    setSelectedData((prevSelected: SelectedDataType) => {
      const isInAlternativeKey = prevSelected[alternativeKey].some(
        (selected) => selected.id === item.id
      );

      if (isInAlternativeKey) {
        return {
          ...prevSelected,
          [alternativeKey]: prevSelected[alternativeKey].filter(
            (selected) => selected.id !== item.id
          ),
        };
      }

      const isItemSelected = prevSelected[key].some(
        (selected) => selected.id === item.id
      );

      const updatedKeyArray = isItemSelected
        ? prevSelected[key].filter((selected) => selected.id !== item.id)
        : [...prevSelected[key], { ...item, value: key }];

      return {
        ...prevSelected,
        [key]: updatedKeyArray,
      };
    });
  };

  const handleUpdateDropDown = (dropKey: string, item: IDaAs) => {
    keyRef.current = dropKey;
    const alternativeKey = dropKey === 'users' ? 'admins' : 'users';

    setSelectedData((prevSelected: SelectedDataType) => {
      const updatedFromAlternativeKey = prevSelected[alternativeKey].filter(
        (selected) => selected.id !== item.id
      );

      const updatedKeyArray = prevSelected[dropKey].some(
        (selected) => selected.id === item.id
      )
        ? prevSelected[dropKey].filter((selected) => selected.id !== item.id)
        : [...prevSelected[dropKey], { ...item, value: dropKey }];

      return {
        ...prevSelected,
        [dropKey]: updatedKeyArray,
        [alternativeKey]: updatedFromAlternativeKey,
      };
    });
  };

  useEffect(() => {
    setAllMembers((prevMembers) => {
      const newMembers = memberData.filter(
        (item: IDaAs) =>
          !prevMembers.some((prevItem) => prevItem.id === item.id)
      );
      return [...prevMembers, ...newMembers];
    });

    setIsFetching(false);
  }, [memberData]);

  const lastItemRef = useCallback(
    (node: any) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage * pageSize < countPage) {
          setIsFetching(true);
          setCurrentPage((prevPage: number) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [countPage, currentPage, isFetching, isLoading, pageSize, setCurrentPage]
  );

  return (
    <div className={`w-full ${isLoading ? 'loading' : ''} `}>
      {allMembers.map((item, index) => {
        const currentKey = keyRef.current;
        const alternativeKey = currentKey === 'users' ? 'admins' : 'users';

        return (
          <div
            ref={index === allMembers.length - 1 ? lastItemRef : undefined}
            key={item.id}
            className="w-11/12 m-auto h-12 px-2.5 bg-white dark:bg-gray-600 dark:border-gray-500 rounded-lg border border-gray-100 justify-between items-center inline-flex"
          >
            <div className="flex w-4/12 items-center gap-2">
              <Avatar icon={userIcon} size="table" />
              <Typography variant="body6" color="neutralDark">
                {item.email}
              </Typography>
            </div>
            <div className="flex justify-center items-center gap-4 ">
              <GroupManagementDropDown
                onClick={(e: { value: string; label: string; id: number }) =>
                  handleUpdateDropDown(e.value, item)
                }
                options={dropdownOptions}
                defaultValue={{
                  id: item.id,
                  label: t(`global.${currentKey}`),
                  value: currentKey,
                }}
              />
              <BaseCheckBox
                size="sm"
                id={item.id}
                name={item.email}
                checked={
                  selectedData[alternativeKey].some(
                    (v: IDaAs) => v.id === item.id
                  ) ||
                  selectedData[currentKey].some((v: IDaAs) => v.id === item.id)
                }
                onChange={() => handleUpdateCheckbox(item)}
              />
            </div>
          </div>
        );
      })}
      {isFetching && <Typography>...loading</Typography>}
    </div>
  );
}
