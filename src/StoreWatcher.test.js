import Backbone from "backbone";
import StoreWatcher from "./StoreWatcher";

describe("get()", () => {
  test("Should able to get data from model", () => {
    const model = new Backbone.Model();
    const watcher = new StoreWatcher(model);
    model.set("a", 1);
    expect(watcher.wrappedStore.get("a")).toBe(1);
    model.set("a", 2);
    model.set("b", 1);
    expect(watcher.wrappedStore.get("a")).toBe(2);
    expect(watcher.wrappedStore.get("b")).toBe(1);
  });

  test("Should get the same wrapped model", () => {
    const model = new Backbone.Model();
    const nestedModel = new Backbone.Model();
    model.set("a", nestedModel);
    const watcher = new StoreWatcher(model);
    const wrappedModel1 = watcher.wrappedStore.get("a");
    const wrappedModel2 = watcher.wrappedStore.get("a");
    expect(wrappedModel1).toBe(wrappedModel2);
    wrappedModel1.set("str", "str");
    expect(wrappedModel1.get("str")).toBe(nestedModel.get("str"));
  });

  test("Should get the same wrapped collection", () => {
    const model = new Backbone.Model();
    const collection = new Backbone.Collection();
    model.set("c", collection);
    const watcher = new StoreWatcher(model);
    const wrappedCollection1 = watcher.wrappedStore.get("c");
    const wrappedCollection2 = watcher.wrappedStore.get("c");
    expect(wrappedCollection1).toBe(wrappedCollection2);
    collection.add(model);
    expect(wrappedCollection1.at(0)).toBe(watcher.wrappedStore);
  });
});

describe(`on('change')`, () => {
  test("Should trigger change event when modal change", () => {
    const model = new Backbone.Model();
    const watcher = new StoreWatcher(model);
    const mockCallback = jest.fn();
    watcher.on("change", mockCallback);
    model.set("a", 1);
    watcher.wrappedStore.get("a");
    expect(mockCallback.mock.calls.length).toBe(0);
    model.set("a", 2);
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  test("Should trigger change event when collection change", () => {
    const model = new Backbone.Model();
    const collection = new Backbone.Collection();
    model.set("c", collection);
    const watcher = new StoreWatcher(model);
    const wrappedCollection = watcher.wrappedStore.get("c");
    const mockCallback = jest.fn();
    watcher.on("change", mockCallback);
    wrappedCollection.at(0);
    expect(mockCallback.mock.calls.length).toBe(0);
    collection.add(1);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
