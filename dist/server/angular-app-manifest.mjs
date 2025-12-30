
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
    'index.csr.html': {size: 22773, hash: 'd03a65d9b861611f04773e896d6debf8b4118ce533e4f6a83af47c4cfea739e8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14495, hash: '920dd1accefd3733b4fb7038a004333c902cc5cc355aeb3087a39da40a996630', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 112131, hash: '0cfda0f820f6a1d6846717a898a048f42e52f511b712b95662ce0fc9df8859e7', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 182669, hash: 'ebae9e25809656643e5a2da6b265b9e0a75266eac462ed44ee9dfcaa5ac5d8d0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6NAANYBT.css': {size: 11680, hash: '3pZljaKCuWo', text: () => import('./assets-chunks/styles-6NAANYBT_css.mjs').then(m => m.default)}
  },
};
