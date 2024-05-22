module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@theme': './src/theme',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@mock': './src/mock',
          '@services': './src/services',
          '@store': './src/store',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@context': './src/context',
          '@config': './src/config',
        },
      },
    ],
  ],
};
