
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/N-NDevelopers"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 25252, hash: '80ec339cc6bf07174da124b288996a9d27d8fc78fe69812df8c7f0f8d49af747', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17072, hash: '98aac6b3e4589d3d3a55ca42fa3522480cad94a79eceba4354f1730d6d6f813f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'N-NDevelopers/index.html': {size: 93422, hash: '7ed051775991b69216f72805c42d14920b9cc80c7dd974241fcaeb93ec1e24f4', text: () => import('./assets-chunks/N-NDevelopers_index_html.mjs').then(m => m.default)},
    'styles-3YC3VJCE.css': {size: 10376, hash: 'dlQfi3O+04U', text: () => import('./assets-chunks/styles-3YC3VJCE_css.mjs').then(m => m.default)}
  },
};
