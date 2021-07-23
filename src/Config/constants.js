const constants = {
  HOST_URL: process.env.REACT_APP_HOST_URL,
  FEEDS_URL: process.env.REACT_APP_FEED_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export default constants;
