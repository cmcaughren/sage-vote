const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for importing from the app directory
config.resolver.sourceExts.push('mjs');
config.resolver.sourceExts.push('cjs');

module.exports = config;