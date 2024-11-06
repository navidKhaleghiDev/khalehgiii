import UsersThree from '@iconify-icons/ph/users-three';

import { Avatar, Typography } from '@redesignUi/atoms';
import { TNumberObjectArray } from '@src/types/global';

type TOnlineAssistanceDetailProps = {
  data: TNumberObjectArray;
  title: string;
  description: string;
};

export default function OnlineAssistanceDetail({
  data,
  title,
  description,
}: TOnlineAssistanceDetailProps) {
  return (
    <div className="flex flex-col p-[13px]">
      <div className="self-start">
        <Typography variant="body5B" color="neutralDark" className="text-start">
          {title}
        </Typography>
        <Typography variant="body6" color="neutral" className="text-start">
          {description}
        </Typography>
      </div>

      <div className="mt-5 max-h-[13.94rem] overflow-y-auto">
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((item) => (
            <div
              className="bg-transparent h-10 border border-gray-100 rounded-lg flex items-center px-2.5 gap-3 mb-2"
              key={Object.values(item).toString()}
            >
              <Avatar icon={UsersThree} size="sm" />
              <Typography color="neutralDark" variant="body6">
                {Object.keys(item)}
              </Typography>
            </div>
          ))}

        {(!Array.isArray(data) || data.length === 0) && null}
      </div>
    </div>
  );
}
