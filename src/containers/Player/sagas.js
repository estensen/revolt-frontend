import { take, call, put } from 'redux-saga/effects';

import {
  GET_PODCAST_PLAYLIST_PENDING,
  GET_ON_DEMAND_PLAYLIST_PENDING,
} from './constants';
import {
  podcastPlaylistLoaded,
  podcastPlaylistError,
  onDemandPlaylistLoaded,
  onDemandPlaylistError,
} from './actions';
import { getQuery, EPISODES_URL, SHOWS_URL } from 'utils/api';

// Individual exports for testing
export function* playPodcast(episodeId, offset) {
  try {
    let episode = yield call(getQuery, EPISODES_URL, 'id', episodeId);
    episode = episode[0];
    let show = yield call(getQuery, SHOWS_URL, 'id', episode.showId);
    show = show[0];
    const episodes = yield call(getQuery, EPISODES_URL, 'showId', show.id);

    const playlist = [];
    let index = 0;

    for (let i = episodes.length - 1; i >= 0; i--) {
      playlist.push({
        title: episodes[i].title,
        show: show.name,
        url: episodes[i].podcastUrl,
      });
      if (episodes[i].id === episode.id) {
        index = episodes.length - 1 - i;
      }
    }

    yield put(podcastPlaylistLoaded(playlist, index, offset));
  } catch (error) {
    yield put(podcastPlaylistError());
  }
}

export function* playOnDemand(episodeId, offset) {
  try {
    let episode = yield call(getQuery, EPISODES_URL, 'id', episodeId);
    episode = episode[0];
    let show = yield call(getQuery, SHOWS_URL, 'id', episode.showId);
    show = show[0];
    const episodes = yield call(getQuery, EPISODES_URL, 'showId', show.id);

    const playlist = episodes
      .map(e => ({
        id: e.id,
        title: e.title,
        show: show.name,
        url: e.soundUrl,
      }))
      .reverse();

    const index = playlist.indexOf(playlist.find(e => e.id === episode.id));

    yield put(onDemandPlaylistLoaded(playlist, index, offset));
  } catch (error) {
    yield put(onDemandPlaylistError());
  }
}

export function* playPodcastWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { episodeId, offset } = yield take(GET_PODCAST_PLAYLIST_PENDING);
    yield call(playPodcast, episodeId, offset);
  }
}

export function* playOnDemandWatcher() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { episodeId, offset } = yield take(GET_ON_DEMAND_PLAYLIST_PENDING);
    yield call(playOnDemand, episodeId, offset);
  }
}

// All sagas to be loaded
export default [playPodcastWatcher, playOnDemandWatcher];
