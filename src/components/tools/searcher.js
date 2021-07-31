//search for matching name or username
searchValueChange = ((searchValue, list, searchIn) => {
  let tempList = [];
  list.forEach((element) => {
    if (
      element[searchIn].toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
      element[searchIn].toLowerCase().indexOf(searchValue.toLowerCase()) !==
        -1 ||
      element.phone.indexOf(searchValue.value) !== -1
    ) {
      tempList.push(element);
    }
  });
  //   filterdList = sortbyName(tempList);
  return tempList;
};
