
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/projects"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 22773, hash: 'd10c4b3edb8cdd7fd28c8858a03a33d709c8a4077c00f359919cee3fe6b30eb5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14495, hash: '8941539dca98c30ea7e0dc955b764c9d89e277c67637bd8c032294a91bae97ed', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 112131, hash: '9ae079313f9b306a80e3ee7a88eeb9ff8ca780f27e3ea1860f920da73f5302d0', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 182785, hash: 'd3f98337ea1169d36f7c32b0b74e6ab59b05fba22d7e0fa893a1670b19e2e970', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6NAANYBT.css': {size: 11680, hash: '3pZljaKCuWo', text: () => import('./assets-chunks/styles-6NAANYBT_css.mjs').then(m => m.default)}
  },
};
