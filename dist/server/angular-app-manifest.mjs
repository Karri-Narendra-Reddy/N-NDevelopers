
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
    'index.csr.html': {size: 22773, hash: '071b0b8216503b2aa5279d6b9df8749a5697a26503cb8e379c4666794b96f9a1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14495, hash: 'a18ffbb1ec7d0d4b354929b6a54c6c31cc8025245bd5aeca412843658029afbb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 187226, hash: '89ee454f8d32a875c33f233150f377a4f98ca47a028aee63f1543912cedbcef9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 112197, hash: '3892aa3f8c91bd732c2e3aee9bf4dcf2e7a616ff03c614ab162e4e3a5209e90f', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'styles-6NAANYBT.css': {size: 11680, hash: '3pZljaKCuWo', text: () => import('./assets-chunks/styles-6NAANYBT_css.mjs').then(m => m.default)}
  },
};
