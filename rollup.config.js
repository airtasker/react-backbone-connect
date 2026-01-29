import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";

const env = process.env.NODE_ENV;

const config = {
  entry: "src/index.js",
  external: ["react", "backbone", "prop-types"],
  globals: {
    react: "React",
    backbone: "Backbone",
    'prop-types': "PropTypes",
  },
  format: env === 'es' ? 'es' : "umd",
  moduleName: "ReactBackboneConnect",
  plugins: [
    nodeResolve(),
    babel({
      exclude: "**/node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    commonjs()
  ]
};

if (env === "min") {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true
      }
    })
  );
}

export default config;
