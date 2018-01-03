import React from 'react';
import {shallow} from 'enzyme';
import Backbone from 'backbone';
import Provider from './Provider';
import {CONTEXT_KEY} from './const';

test('Should have context', () => {
  const store = new Backbone.Model()
  const wrapper = shallow(<Provider store={store}><div/></Provider>);
  const model = wrapper.instance().getChildContext()[CONTEXT_KEY];
  expect(model).toBe(store)
});