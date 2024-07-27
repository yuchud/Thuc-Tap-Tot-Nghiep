import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconCertificate,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Management',
  },
  {
    id: uniqueId(),
    title: 'Courses',
    icon: IconCertificate,
    href: '/courses',
  },
  {
    id: uniqueId(),
    title: 'Customer',
    icon: IconUserPlus,
    href: '/customers',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Pro Plans',
  //   icon: IconUserPlus,
  //   href: '/pro-plans',
  // },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
