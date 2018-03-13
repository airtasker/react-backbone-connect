# React Backbone Connect

React bindings for [Backbone](https://Backbonejs.org/).  
Inspaired by [React Redux](https://github.com/Reactjs/React-Redux)  
Performant and flexible.

[![npm downloads](https://img.shields.io/npm/dm/@airtasker/react-backbone-connect.svg?style=flat-square)](https://www.npmjs.com/package/@airtasker/react-backbone-connect)

In a Backbone project, there is a lot of logic deeply coupled in Backbone models.
By using ReactBackboneConnect, it enables you to build a Redux like project using Backbone and React.  
By decoupling the Backbone models from React components, transitioning from Backbone to Redux (or any other frameworks) will be easy and smooth.

## Installation

React Backbone Connect requires **React 0.14 or later** and **Backbone 1.1.2 or later.**

```
npm install --save @airtasker/react-backbone-connect
```

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).

If you don’t yet use [npm](http://npmjs.com/) or a modern module bundler, and would rather prefer a single-file [UMD](https://github.com/umdjs/umd) build that makes `ReactRedux` available as a global object.

## Documentation

React Backbone Redux API is almost identical to React Redux. [ReactRedux](https://github.com/Reactjs/React-Redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

We also provided `createSelector` and `createStructuredSelector` api that mimics [Reselect](https://github.com/Reactjs/reselect)

## License

MIT
