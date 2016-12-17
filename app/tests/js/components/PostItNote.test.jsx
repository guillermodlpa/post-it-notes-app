
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import PostItNote from '../../../src/js/components/PostItNote';

describe('<PostItNote />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<PostItNote content="Contenido" />);
    expect(wrapper.find('.post-it-note-content').text()).to.equal('Contenido');
  });
});
