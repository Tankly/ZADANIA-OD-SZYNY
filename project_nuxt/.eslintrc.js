module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    "vue/singleline-html-element-content-newline": 0,
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-unused-expressions": "off",
    eqeqeq: "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/valid-v-slot": [
      "error",
      {
        allowModifiers: true,
      },
    ],
  },
}
