import expect from 'expect';
import episodeAdminReducer from '../reducer';
import { fromJS } from 'immutable';

describe('episodeAdminReducer', () => {
  it('returns the initial state', () => {
    expect(episodeAdminReducer(undefined, {})).toEqual(fromJS({}));
  });
});
