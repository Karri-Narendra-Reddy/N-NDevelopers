
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
    'index.csr.html': {size: 22563, hash: 'ae9310dd6885a52593d72773c6aefa92df67e27a4695d6772f2ffac2983041af', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14320, hash: '9308599c9fb636670537ba7642b11506d095b72665fdd7ae8672eacd15cf8f1f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 71004, hash: '6a12115f722f4a876246412defa160d990eb6d19a331edded620296dc0f6ed30', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 112037, hash: '9cebfb32fb40fa5d69abd338e817e954162c9ef73330faef38880b7acb685d85', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-KQRYHPL2.css': {size: 11606, hash: 'V0+BoDTTxdA', text: () => import('./assets-chunks/styles-KQRYHPL2_css.mjs').then(m => m.default)}
  },
};
