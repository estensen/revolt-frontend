import React from 'react';
import { shallow } from 'enzyme';

import { HeaderPlayButton } from '../';

const mockProps = {
  playLive: () => {},
};

describe('<HeaderPlayButton />', () => {
  it('renders correctly', () => {
    const tree = shallow(<HeaderPlayButton {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });
});
