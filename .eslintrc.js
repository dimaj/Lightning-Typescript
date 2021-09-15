module.exports = {
    root: true,
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true
    },
    extends: ["standard", "eslint:recommended", "prettier"],
    // Using typescript-eslint-parser parser for TypeScript
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: false
      },
      sourceType: "module"
    },
    plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
    rules: {
      "prettier/prettier": ["warn"],
      "no-unused-vars": "off", // Disable the base eslint rule to use the @typescript-eslint rule instead.
      "@typescript-eslint/no-unused-vars-experimental": ["warn"],
      "@typescript-eslint/member-ordering": ["warn"],
      "no-undef": "off",
      "no-console": ["error"],
      "simple-import-sort/sort": "warn",
      "valid-jsdoc": [
        "warn",
        {
          requireReturn: true,
          requireReturnType: true,
          requireParamDescription: true,
          requireReturnDescription: true
        }
      ]
    }
  };
