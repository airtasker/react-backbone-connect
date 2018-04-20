import React, { Component } from "react";
import PropTypes from "prop-types";
import Backbone from "backbone";

import { CONTEXT_KEY } from "../const";
import getDisplayName from "../utils/getDisplayName";
import shallowEqual from "../utils/shallowEqual";
import StoreWatcher from "../StoreWatcher";
import createMapToProps from "./createMapToProps";

export default (mapModelToProps, mapTriggerToProps, mergeProps) => {
  return WrappedComponent => {
    class Connected extends Component {
      static displayName = `BackboneConnect(${getDisplayName(
        WrappedComponent
      )})`;
      static contextTypes = {
        [CONTEXT_KEY]: PropTypes.object
      };
      static WrappedComponent = WrappedComponent;

      constructor(props, context) {
        super(props, context);
        this._unmounted = false;
        this.storeWatcher = new StoreWatcher(context[CONTEXT_KEY]);
        this.mapToProps = createMapToProps(
          this.storeWatcher.wrappedStore,
          props,
          mapModelToProps,
          mapTriggerToProps,
          mergeProps
        );

        this.state = {
          mergedProps: this.mapToProps.getMergedProps()
        };

        this.storeWatcher.on("change", () => {
          this.mapToProps.storeUpdated();
          if (!this._unmounted) {
            this.setState({
              mergedProps: this.mapToProps.getMergedProps()
            });
          }
        });
      }

      componentWillReceiveProps(nextProps) {
        if (shallowEqual(this.props, nextProps)) {
          return;
        }
        this.mapToProps.updateProps(nextProps);
        this.mapToProps.getMergedProps();
        this.setState({
          mergedProps: this.mapToProps.getMergedProps()
        });
      }

      shouldComponentUpdate(nextProps, nextState) {
        return this.state.mergedProps !== nextState.mergedProps;
      }

      componentWillUnmount() {
        this._unmounted = true;
        this.storeWatcher.destroy();
      }

      render() {
        return <WrappedComponent {...this.state.mergedProps} />;
      }
    }
    return Connected;
  };
};
