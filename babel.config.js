module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        // mirror tsconfig.json
        alias: {
          "@components": "./app/components",
          "@locales": "./app/locales",
          "@store": "./app/store",
          "@styles": "./app/styles",
          "@types": "./app/types",
          "@utils": "./app/utils",
        },
      },
    ],
  ],
};
