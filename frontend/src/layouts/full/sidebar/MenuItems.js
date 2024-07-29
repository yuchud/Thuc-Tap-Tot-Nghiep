import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Thông tin cá nhân',
  },
  {
    id: uniqueId(),
    title: 'Chỉnh sửa thông tin',
    icon: IconLayoutDashboard,
    href: '/profile',
  },
  {
    id: uniqueId(),
    title: 'Đổi mật khẩu',
    icon: IconTypography,
    href: '/profile/change-password',
  },
  {
    navlabel: true,
    subheader: 'Thông tin tài khoản Pro',
  },
  {
    id: uniqueId(),
    title: 'Lịch sử mua gói Pro',
    icon: IconUserPlus,
    href: '/profile/pro-histories',
  },
];

export default Menuitems;
