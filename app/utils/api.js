
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/graphql' : '/graphql';

const handleError = res => {
  if (res.ok) return res;
  const err = new Error(res.status);
  err.text = res.statusText;
  throw err;
};

export const NEW_API_URL = 'http://localhost:9000/';
export const SHOWS_URL = `${NEW_API_URL}shows/`;
export const POSTS_URL = `${NEW_API_URL}posts/`;
export const EPISODES_URL = `${NEW_API_URL}episodes/`;
export const CATEGORIES_URL = `${NEW_API_URL}categories/`;

export const get = url => fetch(url).then(handleError).then(res => res.json());

export const post = url => fetch(url, { method: 'POST' }).then(handleError).then(res => res.json());

export const getGraphQL = query => get(`${API_URL}?query=${query}`);

export const getPodcasts = showId => get(`http://pappagorg.radiorevolt.no/v1/lyd/podcast/${showId}`);

export const getOnDemand = showId => get(`http://pappagorg.radiorevolt.no/v1/lyd/ondemand/${showId}`);
