const expoPreset = require('jest-expo/jest-preset.js');
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = Object.assign(expoPreset, jestPreset, {
    preset: '@testing-library/react-native',
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)'
    ],
    setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles],
});