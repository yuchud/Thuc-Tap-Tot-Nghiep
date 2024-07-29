const dateUtil = {
  getCurrentDateTime() {
    const date = new Date();
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  addMonth: (date, months) => {
    console.log(date);
    const days = months * 30;
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const milliseconds = seconds * 1000;

    return new Date(date.getTime() + milliseconds);
  },
  getPreviousMonth: (year, month) => {
    if (month == 1) {
      return { year: year - 1, month: 12 };
    }
    return { year, month: month - 1 };
  },
};

module.exports = dateUtil;
