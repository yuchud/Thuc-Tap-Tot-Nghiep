const { default: FullLayout } = require('./FullLayout');

const CustomerLayout = () => {
  return FullLayout({ isProfile: false });
};

export default CustomerLayout;
