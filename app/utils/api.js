
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/graphql' : '/graphql';
export const NEW_API_URL = 'http://localhost:9000/';
const handleError = res => {
  if (res.status < 300) return res;
  const err = new Error(res.status);
  err.text = res.statusText;
  throw err;
};

export const get = url => fetch(url).then(handleError).then(res => res.json());

export const getGraphQL = query => get(`${API_URL}?query=${query}`);

export const getPodcasts = showId => get(`http://pappagorg.radiorevolt.no/v1/lyd/podcast/${showId}`);

export const getOnDemand = showId => get(`http://pappagorg.radiorevolt.no/v1/lyd/ondemand/${showId}`);
