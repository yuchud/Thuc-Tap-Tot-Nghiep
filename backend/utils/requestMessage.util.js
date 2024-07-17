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
  cannotDeleteObjectWithChild: (objectName, objectChildList) => {
    console.log(objectName);
    console.log(objectChildList);

    let message = `${stringUtil.capitalizeFirstLetter(
      objectName
    )} không thể xóa vì có dữ liệu liên quan: `;
    for (let i = 0; i < objectChildList.length; i++) {
      message += `${stringUtil.capitalizeFirstLetter(objectChildList[i])}`;
      if (i !== objectChildList.length - 1) {
        message += ', ';
      }
    }
    return message;
  },
};

module.exports = requestMessageUtil;
