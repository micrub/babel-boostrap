module.exports = {
  "extends": "standard",
  "env" : {
    "mocha": true,
    "es6": true,
    "node": true,
    "browser": true
  },
  "globals": {
    "step": true
  },
  "rules": {
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }]
  }
};
