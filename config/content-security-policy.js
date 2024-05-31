module.exports = function () {
  return {
    delivery: ['meta'],
    policy: {
      // Deny everything by default
      'default-src': ["'none'"],
      // Allow scripts at https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js
      'script-src': [
        "'self'",
        'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js',
        "'unsafe-eval'", // TODO: We should re-consider this
      ],
      // Allow fonts to be loaded from http://fonts.gstatic.com
      'font-src': ["'self'", 'http://fonts.gstatic.com'],
      'connect-src': [
        "'self'",
        'https://api-js.mixpanel.com',
        'https://api3.geo.admin.ch',
        'https://enerscope-api.kube.isc.heia-fr.ch',
      ],
      // Allow images from the origin itself (i.e. current domain)
      'img-src': ["'self'", 'data:', 'https://wmts.geo.admin.ch'], // TODO: We should reconsider this (`data:`), it is because of autoscroll
      // Allow CSS loaded from https://fonts.googleapis.com
      'style-src': [
        "'self'",
        'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        'https://fonts.googleapis.com',
        "'unsafe-inline'", // TODO: We should reconsider this
      ],
      // Omit `media-src` from policy
      // Browser will fallback to default-src for media resources (which is 'none', see above)
      'media-src': null,
      'manifest-src': ["'self'"],
    },
    reportOnly: false,
  };
};
