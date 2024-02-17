export interface IHomeRoutes {
  id: string;
  label: string;
  path: string;
  children?: IHomeRoutes[];
}

export const homeRoutes: IHomeRoutes[] = [
  {
    id: 'home',
    label: 'خانه',
    path: '/',
  },
  {
    id: 'ourServices',
    label: 'خدمات ما',
    path: '/our-services',
    // children: [
    //   {
    //     id: 'home',
    //     label: 'خانه',
    //     path: '/',
    //   },
    // ],
  },
  {
    id: 'weblog',
    label: 'وبلاگ',
    path: '/blog',
  },
  {
    id: 'contactUs',
    label: 'تماس با ما',
    path: '/contact-us',
  },
  {
    id: 'aboutUs',
    label: 'درباره ما',
    path: '/about-us',
  },
];
