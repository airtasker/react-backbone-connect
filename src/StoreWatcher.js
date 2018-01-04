import Backbone from "backbone";

const wrapModel = (curriedWrap, triggerChange, model) => {
  const wrapped = Object.create(model);
  const keys = new Set();
  wrapped.get = propKey => {
    keys.add(propKey);
    return curriedWrap(triggerChange, model.get(propKey));
  };
  const changeListener = ({ changed }) => {
    if (Object.keys(changed).some(key => keys.has(key))) {
      triggerChange();
    }
  };

  model.on("change", changeListener);

  return {
    wrapped,
    destory() {
      model.off("change", changeListener);
    }
  };
};

const wrapCollection = (curriedWrap, triggerChange, collection) => {
  const wrapped = Object.create(collection);
  wrapped.get = propKey => curriedWrap(triggerChange, collection.get(propKey));
  wrapped.at = index => curriedWrap(triggerChange, collection.at(index));
  wrapped.pop = () => curriedWrap(triggerChange, collection.pop());
  wrapped.shift = () => curriedWrap(triggerChange, collection.shift());
  wrapped.unshift = () => curriedWrap(triggerChange, collection.unshift());

  collection.on("add remove reset", triggerChange);

  return {
    wrapped,
    destory() {
      collection.off("add remove reset", triggerChange);
    }
  };
};

const wrap = (cache, triggerChange, object) => {
  const wrapWithCache = (triggerChange, obj) => wrap(cache, triggerChange, obj);
  if (object instanceof Backbone.Model) {
    return cacheable(cache, object, () =>
      wrapModel(wrapWithCache, triggerChange, object)
    ).wrapped;
  }
  if (object instanceof Backbone.Collection) {
    return cacheable(cache, object, () =>
      wrapCollection(wrapWithCache, triggerChange, object)
    ).wrapped;
  }
  return object;
};

const cacheable = (cache, key, fn) => {
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }
  const result = fn();
  cache.set(key, result);
  return result;
};

export default class StoreWatcher {
  cache = new Map();
  events = Object.create(Backbone.Events);

  constructor(store) {
    this.wrappedStore = wrap(this.cache, this.triggerChange, store);
  }

  triggerChange = () => {
    this.events.trigger("change");
  };

  on(eventName, listener) {
    this.events.on(eventName, listener);
  }

  off(eventName, listener) {
    this.events.off(eventName, listener);
  }

  destory() {
    this.cache.forEach(({ destory }) => destory());
  }
}
