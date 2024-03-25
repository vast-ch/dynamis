const path = require('path');
const { frontile } = require('@frontile/theme/plugin');

const appRoot = path.join(__dirname, '../');
const libraries = [
  /* someLibraryName */
];

const libraryPaths = libraries.map((name) =>
  path.dirname(require.resolve(name)),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `${appRoot}/app/**/*.{js,ts,hbs,gjs,gts,html}`,
    ...libraryPaths.map(
      (libraryPath) => `${libraryPath}/**/*.{js,ts,hbs,gjs,gts,html}`,
    ),
    './node_modules/@frontile/theme/dist/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [frontile()],
  safelist: [
    { pattern: /^js-focus-visible/ },
    { pattern: /^sr-only/ },

    // Frontile Notifications Transistions
    { pattern: /^notification-transition/ },

    // Frontile Overlays Transistions and Sizes
    { pattern: /^overlay/ },
    { pattern: /^modal/ },
    { pattern: /^drawer/ },

    // Power Select
    { pattern: /^ember-power-select/ },
  ],
};
