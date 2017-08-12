const API_URL = '/api/';
const PAPPAGORG_API_URL = 'http://pappagorg.radiorevolt.no/v1/';
const PODKAST_API_URL = 'http://podkast.radiorevolt.no/api/url/';

const handleError = res => {
  if (res.ok) return res;
  const err = new Error(res.status);
  err.text = res.statusText;
  throw err;
};

export const SHOWS_URL = `${API_URL}shows/`;
export const POSTS_URL = `${API_URL}posts/`;
export const EPISODES_URL = `${API_URL}episodes/`;
export const CATEGORIES_URL = `${API_URL}categories/`;

export const PAPPAGORG_ONDEMAND_EPISODES_URL = `${PAPPAGORG_API_URL}lyd/ondemand/`;
export const PAPPAGORG_PODCAST_EPISODES_URL = `${PAPPAGORG_API_URL}lyd/podcast/`;
export const PAPPAGORG_SHOWS_URL = `${PAPPAGORG_API_URL}programmer/list/`;

export const get = url => fetch(url).then(handleError).then(res => res.json());
export const getQuery = (url, attribute, value) =>
  fetch(`${url}?${attribute}=${value}`)
    .then(handleError)
    .then(res => res.json());

export const post = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(handleError)
    .then(res => res.json());

export const update = (url, element) =>
  fetch(`${url}${element.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(element),
  }).then(handleError);

export const apiDelete = (url, id) =>
  fetch(`${url}${id}`, {
    method: 'DELETE',
  }).then(handleError);

export const getPodcastUrl = showId =>
  fetch(`${PODKAST_API_URL}${showId}`).then(res => res.text());

export const getPodcasts = showId =>
  get(`http://pappagorg.radiorevolt.no/v1/lyd/podcast/${showId}`);

export const getDigasOnDemandEpisodes = digasShowId =>
  get(`${PAPPAGORG_ONDEMAND_EPISODES_URL}${digasShowId}`);
export const getDigasPodcastEpisodes = digasShowId =>
  get(`${PAPPAGORG_PODCAST_EPISODES_URL}${digasShowId}`);
