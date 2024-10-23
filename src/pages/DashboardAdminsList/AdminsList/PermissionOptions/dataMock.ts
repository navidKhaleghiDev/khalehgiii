export interface Permission {
  id: number;
  name: string;
  codename: string;
  selected: boolean;
}

export interface ContentType {
  content_type: string;
  permissions: Permission[];
}

export const accessMock: ContentType[] = [
  {
    content_type: 'log entry',
    permissions: [
      {
        id: 1,
        name: 'Add log entry',
        codename: 'add_logentry',
        selected: false,
      },
      {
        id: 2,
        name: 'Change log entry',
        codename: 'change_logentry',
        selected: false,
      },
      {
        id: 3,
        name: 'Delete log entry',
        codename: 'delete_logentry',
        selected: false,
      },
      {
        id: 4,
        name: 'View log entry',
        codename: 'view_logentry',
        selected: false,
      },
    ],
  },
  {
    content_type: 'group',
    permissions: [
      {
        id: 5,
        name: 'Add group',
        codename: 'add_group',
        selected: false,
      },
      {
        id: 6,
        name: 'Change group',
        codename: 'change_group',
        selected: false,
      },
      {
        id: 7,
        name: 'Delete group',
        codename: 'delete_group',
        selected: false,
      },
      {
        id: 8,
        name: 'View group',
        codename: 'view_group',
        selected: false,
      },
    ],
  },
  {
    content_type: 'permission',
    permissions: [
      {
        id: 9,
        name: 'Add permission',
        codename: 'add_permission',
        selected: false,
      },
      {
        id: 10,
        name: 'Change permission',
        codename: 'change_permission',
        selected: false,
      },
      {
        id: 11,
        name: 'Delete permission',
        codename: 'delete_permission',
        selected: false,
      },
      {
        id: 12,
        name: 'View permission',
        codename: 'view_permission',
        selected: false,
      },
    ],
  },
  {
    content_type: 'config',
    permissions: [
      {
        id: 13,
        name: 'Add config',
        codename: 'add_config',
        selected: false,
      },
      {
        id: 14,
        name: 'Change config',
        codename: 'change_config',
        selected: false,
      },
      {
        id: 15,
        name: 'Delete config',
        codename: 'delete_config',
        selected: false,
      },
      {
        id: 16,
        name: 'View config',
        codename: 'view_config',
        selected: false,
      },
    ],
  },
  {
    content_type: 'daas meta config',
    permissions: [
      {
        id: 17,
        name: 'Add daas meta config',
        codename: 'add_daasmetaconfig',
        selected: false,
      },
      {
        id: 18,
        name: 'Change daas meta config',
        codename: 'change_daasmetaconfig',
        selected: false,
      },
      {
        id: 19,
        name: 'Delete daas meta config',
        codename: 'delete_daasmetaconfig',
        selected: false,
      },
      {
        id: 20,
        name: 'View daas meta config',
        codename: 'view_daasmetaconfig',
        selected: false,
      },
    ],
  },
  {
    content_type: 'webcam access',
    permissions: [
      {
        id: 21,
        name: 'Add webcam access',
        codename: 'add_webcamaccess',
        selected: false,
      },
      {
        id: 22,
        name: 'Change webcam access',
        codename: 'change_webcamaccess',
        selected: false,
      },
      {
        id: 23,
        name: 'Delete webcam access',
        codename: 'delete_webcamaccess',
        selected: false,
      },
      {
        id: 24,
        name: 'View webcam access',
        codename: 'view_webcamaccess',
        selected: false,
      },
    ],
  },
  {
    content_type: 'white list files',
    permissions: [
      {
        id: 25,
        name: 'Add white list files',
        codename: 'add_whitelistfiles',
        selected: false,
      },
      {
        id: 26,
        name: 'Change white list files',
        codename: 'change_whitelistfiles',
        selected: false,
      },
      {
        id: 27,
        name: 'Delete white list files',
        codename: 'delete_whitelistfiles',
        selected: false,
      },
      {
        id: 28,
        name: 'View white list files',
        codename: 'view_whitelistfiles',
        selected: false,
      },
    ],
  },
  {
    content_type: 'content type',
    permissions: [
      {
        id: 29,
        name: 'Add content type',
        codename: 'add_contenttype',
        selected: false,
      },
      {
        id: 30,
        name: 'Change content type',
        codename: 'change_contenttype',
        selected: false,
      },
      {
        id: 31,
        name: 'Delete content type',
        codename: 'delete_contenttype',
        selected: false,
      },
      {
        id: 32,
        name: 'View content type',
        codename: 'view_contenttype',
        selected: false,
      },
    ],
  },
  {
    content_type: 'clocked schedule',
    permissions: [
      {
        id: 33,
        name: 'Add clocked schedule',
        codename: 'add_clockedschedule',
        selected: false,
      },
      {
        id: 34,
        name: 'Change clocked schedule',
        codename: 'change_clockedschedule',
        selected: false,
      },
      {
        id: 35,
        name: 'Delete clocked schedule',
        codename: 'delete_clockedschedule',
        selected: false,
      },
      {
        id: 36,
        name: 'View clocked schedule',
        codename: 'view_clockedschedule',
        selected: false,
      },
    ],
  },
  {
    content_type: 'crontab schedule',
    permissions: [
      {
        id: 37,
        name: 'Add crontab schedule',
        codename: 'add_crontabschedule',
        selected: false,
      },
      {
        id: 38,
        name: 'Change crontab schedule',
        codename: 'change_crontabschedule',
        selected: false,
      },
      {
        id: 39,
        name: 'Delete crontab schedule',
        codename: 'delete_crontabschedule',
        selected: false,
      },
      {
        id: 40,
        name: 'View crontab schedule',
        codename: 'view_crontabschedule',
        selected: false,
      },
    ],
  },
  {
    content_type: 'interval schedule',
    permissions: [
      {
        id: 41,
        name: 'Add interval schedule',
        codename: 'add_intervalschedule',
        selected: false,
      },
      {
        id: 42,
        name: 'Change interval schedule',
        codename: 'change_intervalschedule',
        selected: false,
      },
      {
        id: 43,
        name: 'Delete interval schedule',
        codename: 'delete_intervalschedule',
        selected: false,
      },
      {
        id: 44,
        name: 'View interval schedule',
        codename: 'view_intervalschedule',
        selected: false,
      },
    ],
  },
  {
    content_type: 'periodic task',
    permissions: [
      {
        id: 45,
        name: 'Add periodic task',
        codename: 'add_periodictask',
        selected: false,
      },
      {
        id: 46,
        name: 'Change periodic task',
        codename: 'change_periodictask',
        selected: false,
      },
      {
        id: 47,
        name: 'Delete periodic task',
        codename: 'delete_periodictask',
        selected: false,
      },
      {
        id: 48,
        name: 'View periodic task',
        codename: 'view_periodictask',
        selected: false,
      },
    ],
  },
  {
    content_type: 'periodic tasks',
    permissions: [
      {
        id: 49,
        name: 'Add periodic tasks',
        codename: 'add_periodictasks',
        selected: false,
      },
      {
        id: 50,
        name: 'Change periodic tasks',
        codename: 'change_periodictasks',
        selected: false,
      },
      {
        id: 51,
        name: 'Delete periodic tasks',
        codename: 'delete_periodictasks',
        selected: false,
      },
      {
        id: 52,
        name: 'View periodic tasks',
        codename: 'view_periodictasks',
        selected: false,
      },
    ],
  },
  {
    content_type: 'solar event',
    permissions: [
      {
        id: 53,
        name: 'Add solar event',
        codename: 'add_solarevent',
        selected: false,
      },
      {
        id: 54,
        name: 'Change solar event',
        codename: 'change_solarevent',
        selected: false,
      },
      {
        id: 55,
        name: 'Delete solar event',
        codename: 'delete_solarevent',
        selected: false,
      },
      {
        id: 56,
        name: 'View solar event',
        codename: 'view_solarevent',
        selected: false,
      },
    ],
  },
  {
    content_type: 'analytic configuration',
    permissions: [
      {
        id: 57,
        name: 'Add analytic configuration',
        codename: 'add_analyticconfiguration',
        selected: false,
      },
      {
        id: 58,
        name: 'Change analytic configuration',
        codename: 'change_analyticconfiguration',
        selected: false,
      },
      {
        id: 59,
        name: 'Delete analytic configuration',
        codename: 'delete_analyticconfiguration',
        selected: false,
      },
      {
        id: 60,
        name: 'View analytic configuration',
        codename: 'view_analyticconfiguration',
        selected: false,
      },
    ],
  },
  {
    content_type: 'playback schedule',
    permissions: [
      {
        id: 61,
        name: 'Add playback schedule',
        codename: 'add_playbackschedule',
        selected: false,
      },
      {
        id: 62,
        name: 'Change playback schedule',
        codename: 'change_playbackschedule',
        selected: false,
      },
      {
        id: 63,
        name: 'Delete playback schedule',
        codename: 'delete_playbackschedule',
        selected: false,
      },
      {
        id: 64,
        name: 'View playback schedule',
        codename: 'view_playbackschedule',
        selected: false,
      },
    ],
  },
];
