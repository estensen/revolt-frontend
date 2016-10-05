import expect from 'expect';
import adminReducer from '../reducer';
import { fromJS } from 'immutable';

describe('adminReducer', () => {
  it('returns the initial state', () => {
    expect(adminReducer(undefined, {})).toEqual(fromJS({}));
  });
});
