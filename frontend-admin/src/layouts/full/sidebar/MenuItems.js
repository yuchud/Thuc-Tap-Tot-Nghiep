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
    subheader: 'Thống kê',
  },

  {
    id: uniqueId(),
    title: 'Doanh thu',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Tài khoản',
    icon: IconLogin,
    href: '/accounts',
  },
  {
    navlabel: true,
    subheader: 'Quản lý',
  },
  {
    id: uniqueId(),
    title: 'Khóa học',
    icon: IconCertificate,
    href: '/courses',
  },
  {
    id: uniqueId(),
    title: 'Khách hàng',
    icon: IconUserPlus,
    href: '/customers',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Pro Plans',
  //   icon: IconUserPlus,
  //   href: '/pro-plans',
  // },
];

export default Menuitems;
