const stringUtil = require('./string.util');

const requestMessageUtil = {
  duplicatedObject: (duplicatedProp, objectName) => {
    return `${stringUtil.capitalizeFirstLetter(
      duplicatedProp
    )} ${objectName} bị trùng`;
  },
  requiredObject: (duplicatedProp, objectName) => {
    return `${stringUtil.capitalizeFirstLetter(
      duplicatedProp
    )} ${objectName} không được để trống`;
  },
  successActionObject: (action, objectName) => {
    return `${stringUtil.capitalizeFirstLetter(
      action
    )} ${objectName} thành công`;
  },
  notFoundObject: (objectName) => {
    return `${stringUtil.capitalizeFirstLetter(objectName)} không tồn tại`;
  },
};

module.exports = requestMessageUtil;
