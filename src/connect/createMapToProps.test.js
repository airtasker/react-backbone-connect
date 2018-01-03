import Backbone from 'backbone';
import createMapToProps from "./createMapToProps";


describe('Should pass store and props to mapStoreToProps', () => {
  test('test (store, props) => ({}) function', () => {
    const store = new Backbone.Model();
    const props = {};
    const mock = jest.fn((store, props) => ({}));
    const mapToProps = createMapToProps(store, props, mock);
    expect(mock).toBeCalledWith(store, props);
    mapToProps.storeUpdated();
    expect(mock.mock.calls.length).toBe(2);
    const nextProps = {a: 1};
    mapToProps.updateProps(nextProps);
    expect(mock.mock.calls.length).toBe(3);
    expect(mock).toBeCalledWith(store, nextProps);
  });

  test('test (store) => ({}) function', () => {
    const store = new Backbone.Model();
    const props = {};
    const mock = jest.fn((store) => ({}));
    const mapToProps = createMapToProps(store, props, mock);
    const nextProps = {a: 1};
    mapToProps.updateProps(nextProps);
    expect(mock.mock.calls.length).toBe(1);
  });
});

describe('Should pass trigger and props to mapTriggerToProps', () => {
  test('test (trigger, props) => ({}) function', () => {
    const store = new Backbone.Model();
    const props = {};
    const mock = jest.fn((trigger, props) => ({}));
    const mapToProps = createMapToProps(store, props, null, mock);
    expect(mock.mock.calls[0][1]).toBe(props);
    mapToProps.storeUpdated();
    expect(mock.mock.calls.length).toBe(1);
    const nextProps = {a: 1};
    mapToProps.updateProps(nextProps);
    expect(mock.mock.calls.length).toBe(2);
    expect(mock.mock.calls[1][1]).toBe(nextProps);
  });

  test('test (trigger) => ({}) function', () => {
    const store = new Backbone.Model();
    const props = {};
    const mock = jest.fn((trigger) => ({}));
    const mapToProps = createMapToProps(store, props, null, mock);
    const nextProps = {a: 1};
    mapToProps.updateProps(nextProps);
    expect(mock.mock.calls.length).toBe(1);
  });
});

describe('Should always return same Object when no update', () => {
  test('test null function', () => {
    const mapToProps = createMapToProps(new Backbone.Model(), {});
    const result1 = mapToProps.getMergedProps();
    expect(result1).toEqual({});
    mapToProps.storeUpdated();
    mapToProps.updateProps({});
    expect(result1).toBe(mapToProps.getMergedProps());
  });


  test('test () => {} function', () => {
    const mapToProps = createMapToProps(new Backbone.Model(), {}, () => {}, () => {});
    const result1 = mapToProps.getMergedProps();
    expect(result1).toEqual({});
    mapToProps.storeUpdated();
    mapToProps.updateProps({});
    expect(result1).toBe(mapToProps.getMergedProps());
  });

});