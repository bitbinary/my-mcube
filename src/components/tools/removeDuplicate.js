export default function removeDuplicate(list, checkFor = '') {
  const seen = new Set();

  const filteredArr = list.filter((el) => {
    const duplicate = seen.has(el[checkFor]);
    seen.add(el.id);
    return !duplicate;
  });
  return filteredArr;
}
