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
];

export default Menuitems;
