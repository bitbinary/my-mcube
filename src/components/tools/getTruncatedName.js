export const truncateName = (name) => {
  let nameSplit = String(name).split(' ');
  if (nameSplit.length === 0) return 'U';
  if (nameSplit.length === 1) {
    return (nameSplit[0][0] + nameSplit[0][1]).toUpperCase();
  }
  return (nameSplit[0][0] + nameSplit[1][0]).toUpperCase();
};
