module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "@next/eslint-plugin-next",
    "eslint-plugin-prettier",
    "@typescript-eslint",
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // don't await inside a loop, use Promise.all or similar
    "no-await-in-loop": ["error"],

    // so you don't forget to remove your leftover from improper debugging
    "no-console": ["error"],

    // don't do useless cast
    "no-extra-boolean-cast": ["error"],

    // don't add unecessary parens
    "no-extra-parens": ["error", "all", {
      "ignoreJSX": "multi-line",
      "returnAssign": false,
      "conditionalAssign": true,
      "nestedBinaryExpressions": false,
      "enforceForArrowConditionals": false,
      "enforceForSequenceExpressions": false,
      "enforceForNewInMemberExpressions": false
    }],

    // dont't reassign parameters
    "no-param-reassign": ["error", { "props": true }],

    // bruh, it's 2023. do you still use var? :/
    "no-var": ["error"],

    // if you're not going to use it,
    // might as well don't write it in the first place
    "no-empty-function": ["error"],

    // explicit is better than implicit
    "no-implicit-coercion": ["error"],

    // prevent you from typo of " or ' instead or `
    // when you want a template literal
    "no-template-curly-in-string": ["error"],

    // eval is evil
    "no-eval": ["error"],

    // return-await only useful if it has try-catch
    // see: https://jakearchibald.com/2017/await-vs-return-vs-return-await/
    "no-return-await": ["error"],

    // as all things should be
    "no-use-before-define": ["error"],

    // trailing comma only allowed for multiline
    "comma-dangle": ["error", "never"],

    // only allows space after comma
    // ex: [1, 2, 3, 4]   valid
    //     [1 ,2 , 3 ,4]  invalid
    "comma-spacing": ["error", { "before": false, "after": true }],

    // don't add space around curly braces, it's useless
    // ex: `${foo + bar}`   valid
    //     `${ foo + bar }` invalid
    "template-curly-spacing": ["error", "never"],

    // space makes it ambiguous
    // ex: (...foo)   valid
    //     (... foo)  invalid
    "rest-spread-spacing": ["error", "never"],

    // again, be explicit, `arguments` can be overriden anyway
    // ex: (...arg) => { return args }  valid
    //     () => { return arguments }   invalid
    "prefer-rest-params": ["error"],

    // use `let` or `const` properly
    "prefer-const": ["warn"],

    // use spread operator instead of .apply()
    "prefer-spread": ["warn"],

    // == is not enough, we need ===
    "eqeqeq": ["error"],

    // preventing bugs and increasing code clarity by
    // ensuring that block statements are wrapped in curly braces.
    "curly": ["error", "multi-line", "consistent"],

    // requires return statements to either always or never specify values.
    "consistent-return": ["error"],

    // Shadowing is the process by which a local variable shares the same name
    // as a variable in its containing scope
    "no-shadow": ["off"],
    "@typescript-eslint/no-shadow": ["warn"],

    // useless stuffs
    "no-useless-return": ["warn"],
    "no-useless-concat": ["warn"],
    "no-useless-constructor": ["warn"],
    "no-useless-rename": ["warn"],
    "no-useless-computed-key": ["warn"],
    "no-useless-catch": ["warn"],
    "no-useless-call": ["warn"],

    // just why tho
    "require-await": ["error"],

    // the force is strong with this one
    "yoda": ["error"],

    // give them some styles!
    // warn instead of error because I don't want to give headaches to people
    "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],

    "no-multi-spaces": ["warn", { "ignoreEOLComments": false }],
    "semi": ["error", "never"],
    "quotes": ["warn", "double"],
    "padded-blocks": ["warn", "never"],
    "semi-style": ["warn", "last"],
    "semi-spacing": ["warn", { "before": false, "after": true }],
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "space-before-blocks": ["warn", "always"],
    "switch-colon-spacing": ["warn", { "after": true, "before": false }],
    "keyword-spacing": ["warn", { "before": true, "after": true }],

    "indent": ["error", 2, {
      "SwitchCase": 1,
      "ignoredNodes": ["PropertyDefinition"]
    },],

    "max-statements-per-line": ["error", { "max": 1 }],

    "no-trailing-spaces": "error",

    "object-curly-spacing": ["error", "always"],

    // we still need those @ts- comments
    "@typescript-eslint/ban-ts-comment": ["off"],
    "@typescript-eslint/ban-ts-ignore": ["off"],

    // you've come this far, yet still uses any??
    "@typescript-eslint/no-explicit-any": ["error"],

    "@typescript-eslint/prefer-optional-chain": ["warn"],
    "@typescript-eslint/no-empty-function": ["error"],
    "@typescript-eslint/no-empty-interface": ["error"],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': "error",

    "prettier/prettier": ["error", {
      "trailingComma": "none",
      "printWidth": 120
    }]
  },
}
