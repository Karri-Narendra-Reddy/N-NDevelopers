
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
    'index.csr.html': {size: 22773, hash: '7a816427989510d73757c22a884f8434f3bdb1cc63789bc317c39766fb05c1dc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14495, hash: 'a3bd892851081799d5029e5da365dd52dd1b72c96f090139b1380b1de94f6edc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 112131, hash: '590ae76c7ae3eb21abd91c7abb31b4a1452ca66e98f172bf4297629365ed8874', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 182785, hash: '4c02ad4f4eac88a4c64f64b33deebf6dbf95f8a2bfd49f505966cfdd09440f32', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6NAANYBT.css': {size: 11680, hash: '3pZljaKCuWo', text: () => import('./assets-chunks/styles-6NAANYBT_css.mjs').then(m => m.default)}
  },
};
