const sortby = (list, sortOn = '', latestFirst = true) => {
  console.log(list, sortOn, latestFirst);
  if (!list) return list;
  if (sortOn !== '') {
    list.sort(function (a, b) {
      let element_a = '';
      let element_b = '';
      if (typeof a[sortOn] === 'string') {
        element_a = a[sortOn].toLowerCase();
        element_b = b[sortOn].toLowerCase();
      } else {
        element_a = a[sortOn];
        element_b = b[sortOn];
      }
      if (element_a < element_b) {
        return latestFirst ? 1 : -1;
      }
      if (element_a > element_b) {
        return latestFirst ? -1 : 1;
      }
      return 0;
    });
  }
  return list;
};
export default sortby;
