export default sortby = (list, sortOn) => {
  list.sort(function (a, b) {
    let element_a = '';
    let element_b = '';
    if (typeof (a[sortOn] !== 'string')) {
      element_a = a[sortOn].toLowerCase();
      element_b = b[sortOn].toLowerCase();
    } else {
      element_a = a[sortOn];
      element_b = b[sortOn];
    }
    if (element_a < element_b) {
      return -1;
    }
    if (element_a > element_b) {
      return 1;
    }
    return 0;
  });
  return list;
};
