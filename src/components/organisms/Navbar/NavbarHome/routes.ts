export interface HomeRouteItem {
  id: string;
  label: string;
  path: string;
  children?: HomeRouteItem[];
}

export const homeRoutes: HomeRouteItem[] = [
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
