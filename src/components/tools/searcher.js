//search for matching name or username
const searchValueChange = (searchValue, list, searchIn) => {
  let tempList = [];
  list.forEach((element) => {
    let truthvalue = searchIn.some(
      (index) =>
        element[index]?.toLowerCase()?.indexOf(searchValue?.toLowerCase()) !==
        -1,
    );
    if (truthvalue) {
      tempList.push(element);
    }
  });
  //   filterdList = sortbyName(tempList);
  return tempList;
};

export default searchValueChange;
