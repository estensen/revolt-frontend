import expect from 'expect';
import categoriesReducer from '../reducer';
import { fromJS } from 'immutable';

describe('categoriesReducer', () => {
  it('returns the initial state', () => {
    expect(categoriesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
