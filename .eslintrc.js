module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    "es6": true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  rules: {
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/valid-v-for': 'warn',

    "vue/max-attributes-per-line": ['warn', {
      "singleline": 4,
      "multiline": {
        "max": 4,
        "allowFirstLine": false
      }
    }],

    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};