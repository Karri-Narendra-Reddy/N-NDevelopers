
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
    'index.csr.html': {size: 25298, hash: '9533d0a99964645439ad8a0a3d8ed04dcff4b8541c3afa14f76892bec7ebc51e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17103, hash: '0cbcbb253e1f58499096c8589d92de315bcfadad7be4fc95216ba4ae13e19fb6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 54394, hash: '482062af1d4cbc6c55dc8c5950560289d2a8b8ec047477ef32ba769535f71f97', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 95771, hash: 'f0f94214d9adf80773cc301c5acfdf3216089e6274d96f707cfe0868fc19c878', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-YLKKKPQW.css': {size: 10867, hash: '2N+A97Fc/IU', text: () => import('./assets-chunks/styles-YLKKKPQW_css.mjs').then(m => m.default)}
  },
};
