
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
    'index.csr.html': {size: 22773, hash: '3ff5d7756987cefd46c4eb6a44bdb574e5a61c861ff79b77a1e9cdd6a39e975d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14495, hash: 'f4c869154936e348ca457e531af7a68e4bc132d8441e9c3d3104b332aca91a87', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 112131, hash: 'abdc0b2767e70c2072dbff3bc14a5316c9f3fc4038584334ca875aa0936e33ee', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 187107, hash: '3c45b2f2849ae63230200ba591137d64ebf2c8eff5d734717b24239bfeb94655', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6NAANYBT.css': {size: 11680, hash: '3pZljaKCuWo', text: () => import('./assets-chunks/styles-6NAANYBT_css.mjs').then(m => m.default)}
  },
};
