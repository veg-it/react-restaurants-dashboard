module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: false,  // нужно установить значение true для поддержки jsx
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-unused-vars': 'error', // включаем правило, которое показывает неиспользованные переменные
    'react/jsx-uses-vars': 'error', // это правило будет проверять использование переменных в jsx
    'react/jsx-uses-react': 'error', // это правило будет проверять использование React в jsx
    'max-len': [
      'error',
      {
        code: 100, // ограничиваем длину строки кода до 100 символов
        ignoreComments: true, // игнорируем комментарии
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    'react/prop-types': 2,
  },
};
