import { OnlineAssistanceModel } from '@src/services/users/types';

export const onlineAssistanceListDataMock: OnlineAssistanceModel[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: index,
    created_at: '2024-06-01T08:53:09.354736',
    admin_ip_addr: null,
    in_use: true,
    last_uptime: '2024-06-01T08:53:09.354736',
    duration_time: 24.0,
    knowledge_management_record_path: '/home/mohammadjavad/Downloads/out4.mkv',
    admin: '0a3d8086-3eb7-4422-9625-bd0a6b29aca3',
    user: '1bd39ca7-c4e5-4311-aee5-d80d2722daba',
  })
);
