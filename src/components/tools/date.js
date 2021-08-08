export const dateToUTC = (date) => {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(date);
  var dateUTC = new Date(d);
  return dateUTC.toLocaleString();
};
