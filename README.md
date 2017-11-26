# Babel 6 packages based project bootstrap template.

* Template for project "bootstrapping" using `yarn` and Babel 6 NPM packages.
 * Babel 6 NPM packages:
    * `babel-cli`
    * `babel-polyfill`
    * Presets:
      * `env`
    * Plugins:
      * `transform-class-properties`
    * `.babelrc`
       * With default configuration for presets and plugins mentioned above.
 * `mocha` & `chai` for CLI testing.
   * Babel is transformed at runtime.
* Basic npm scripts:
 * `npm run test`
   * Traverse trough all tests in `test/` directory.
 * `npm run build`
   * Clean `dist/` directory.
     * Transpile ES6 `*.js` files content:
       * from `src/`.
        * into `dist/`.
