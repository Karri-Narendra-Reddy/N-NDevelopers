
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/N-NDevelopers/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/N-NDevelopers"
  },
  {
    "renderMode": 2,
    "route": "/N-NDevelopers/projects"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 25253, hash: 'e91cf9d173fa645ca77024054b161e1bee42ee61f97de63953fef9c3b0a3c687', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17073, hash: 'af58e8628a4e790d96d375c78085af8918c8435b4a4600082d894aab0ac11e8f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 54348, hash: '412afa0aceb40c6d0069c8b2baf0da67ba6939d2c0eb4cf7c3fca545004344e3', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 95723, hash: 'a66cf7ab42d564e803a833e7c75d9d734fee4ffdf6af8159b1a1f56ec596c8a5', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-YLKKKPQW.css': {size: 10867, hash: '2N+A97Fc/IU', text: () => import('./assets-chunks/styles-YLKKKPQW_css.mjs').then(m => m.default)}
  },
};
