export const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const isNameEmpty = (name) => {
  let isNameEmpty = false;
  if (!name.trim()) {
    isNameEmpty = true;
  }
  return isNameEmpty;
};

export const toSentenceCase = (input) => {
  input = input === undefined || input === null ? '' : input;
  input = input.toLowerCase();
  return input.toString().replace(/(^|[\n.] *)([a-z])/g, function (match, separator, char) {
    return separator + char.toUpperCase();
  });
};
