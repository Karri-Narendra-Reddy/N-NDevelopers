
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/N-NDevelopers/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/N-NDevelopers"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 25253, hash: 'd3e500558004faf57daf60fa20e5c35a3c49ef5b59dd8377d543cde52be6c50e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17073, hash: '811616499320569d12edfe88e69ad3818d8ef1c11222346921e34308bc5c17a3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 93423, hash: '4a5d81cbd363d4a0e2bfd675cc2cd6483903c3afe5307a5ce17741a83401aeb7', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-3YC3VJCE.css': {size: 10376, hash: 'dlQfi3O+04U', text: () => import('./assets-chunks/styles-3YC3VJCE_css.mjs').then(m => m.default)}
  },
};
