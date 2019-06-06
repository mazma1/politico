const helpers = {
  titleCase: (title) => {
    const words = title.split(' ');
    return words.map(word => word[0].toUpperCase() + word.substr(1)).join(' ');
  },
};

export default helpers;
