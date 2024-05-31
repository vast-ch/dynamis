'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    emberData: {
      debug: {
        LOG_PAYLOADS: true, // data store received to update cache with
        LOG_OPERATIONS: true, // updates to cache remote state
        LOG_MUTATIONS: true, // updates to cache local state
        LOG_NOTIFICATIONS: true,
        LOG_REQUESTS: true, // log Requests issued via the request manager
        LOG_REQUEST_STATUS: true,
        LOG_IDENTIFIERS: true,
        LOG_GRAPH: true, // relationship storage
        LOG_INSTANCE_CACHE: true, // instance creation/deletion
      },
    },
    fingerprint: {
      exclude: [
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png',
      ],
    },

    'ember-cli-babel': { enableTypeScriptTransform: true },

    // for <ResponsiveImage />
    'responsive-image': {
      images: [
        {
          include: 'assets/images/**/*',
          widths: [2048, 1536, 1080, 750, 640],
        },
      ],
    },

    // For PWA /config/manifest.js
    'ember-cli-image-transformer': {
      images: [
        {
          inputFilename: 'public/assets/images/logo-square.svg',
          outputFileName: 'appicon-',
          convertTo: 'png',
          destination: 'assets/pwa/',
          sizes: [32, 192, 280, 512],
        },
      ],
    },
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    staticEmberSource: true,

    skipBabel: [
      {
        package: 'qunit',
      },
    ],

    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              resourceQuery: /responsive/,
              use: require('@ember-responsive-image/webpack').setupLoaders(),
            },
            {
              test: /.css$/i,
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      config: 'config/postcss.config.js',
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
  });
};
