import shallowEqual from "../utils/shallowEqual";
import trigger from "../utils/trigger";

const defaultMergeProps = (modelProps, defaultsProps, props) => ({
  ...props,
  ...modelProps,
  ...defaultsProps
});
const hasPropsParam = fn => fn && fn.length > 1;

const createGetMergedProps = (mergeProps, propsGetter) => {
  let lastArgs = [];
  let lastResult;
  return () => {
    const args = propsGetter();
    if (
      lastArgs.length !== args.length ||
      args.some((arg, i) => !shallowEqual(arg, lastArgs[i]))
    ) {
      let nextResult = mergeProps(...args);
      if (!shallowEqual(nextResult, lastResult)) {
        lastResult = nextResult;
      }
    }
    lastArgs = args;
    return lastResult;
  };
}; 

export default (
  store,
  props,
  mapStoreToProps,
  mapTriggerToProps,
  mergeProps = defaultMergeProps
) => {
  let storeProps = mapStoreToProps ? mapStoreToProps(store, props) : {};
  let triggerProps = mapTriggerToProps ? mapTriggerToProps(trigger, props) : {};
  let lastProps = props;

  return {
    storeUpdated() {
      if (mapStoreToProps) {
        storeProps = mapStoreToProps(store, lastProps);
      }
    },
    updateProps(nextProps) {
      lastProps = nextProps;
      if (hasPropsParam(mapStoreToProps)) {
        storeProps = mapStoreToProps(store, lastProps);
      }
      if (hasPropsParam(mapTriggerToProps)) {
        triggerProps = mapTriggerToProps(trigger, lastProps);
      }
    },
    getMergedProps: createGetMergedProps(mergeProps, () => [storeProps, triggerProps, lastProps])
  };
};
