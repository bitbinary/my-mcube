const urlStringFormater = (URL, config) => {
  let newURL = URL;
  Object.entries(config).map(([key, value]) => {
    console.log(value);
    newURL = newURL + key + '=' + value.join('&');
  });
  return newURL;
};

let url = urlStringFormater('/', { filters: ['Mentors', 'Mentees'] });
console.log(url);
