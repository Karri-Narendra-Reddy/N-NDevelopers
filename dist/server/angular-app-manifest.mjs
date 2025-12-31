
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
    'index.csr.html': {size: 22773, hash: 'acdf7c9a59fa90a72bce5153fd819eb796f9623f4b4e7955c93d0d0a86f213dd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14495, hash: 'e4662034185e477e4187c62eefcbb4d66b80d94264261931822246ec116a02a3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 112131, hash: '4082fc28298de2ad33dff779524197aeea43d416f7ca78b9b250859fcfc273e6', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 187108, hash: '7043ad337146ce082f69574f6b57687cb41ecc431b796eaf4730131b91bc71a6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6NAANYBT.css': {size: 11680, hash: '3pZljaKCuWo', text: () => import('./assets-chunks/styles-6NAANYBT_css.mjs').then(m => m.default)}
  },
};
