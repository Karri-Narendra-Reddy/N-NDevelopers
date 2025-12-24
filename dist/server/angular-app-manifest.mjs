
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
    'index.csr.html': {size: 22563, hash: 'ee5f91e4342e090631c01b1b1cf56ed9e8c99a4e01fb74b1e1f761d3c01bdc1b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14320, hash: '342155fb0936247117338a7fcd04e5e39c7798fd92d65d4c6ad1c4645fc9cb38', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 61485, hash: 'c6f3922ad653e049bd6686c049980032d7675f9abe3f446e98c33dc6adb53fdd', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 104123, hash: 'cf8e981064d4bc7694e465068c11cc8ca4478f9b964f15cc09e638de6368a0da', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-KQRYHPL2.css': {size: 11606, hash: 'V0+BoDTTxdA', text: () => import('./assets-chunks/styles-KQRYHPL2_css.mjs').then(m => m.default)}
  },
};
