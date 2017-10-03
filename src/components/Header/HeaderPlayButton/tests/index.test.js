import React from 'react';
import { shallow, mount } from 'enzyme';

import { HeaderPlayButton } from '../';

describe('<HeaderPlayButton />', () => {
  it('renders correctly', () => {
    const mockProps = {
      playLive: jest.fn(),
    };
    const tree = shallow(<HeaderPlayButton {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('calls playLive when clicked', () => {
    const mockProps = {
      playLive: jest.fn(),
    };
    const tree = mount(<HeaderPlayButton {...mockProps} />);
    tree.find('.playButton').simulate('click');
    expect(mockProps.playLive).toBeCalled();
  });
});
