
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
    'index.csr.html': {size: 22600, hash: '399e72717f0107775db0b9bba6dcc88b84d9fa812f09fcd50c765be0ac98305e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14322, hash: '1da843bdc8b012a76bbacd808abc138b6a945077ea2ac982e93279e26d5a8c09', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 111125, hash: '73ef96c1e11b5f3f24a2c1578f3a74cf3b6c45f29b409bd88911750172b8ee51', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'index.html': {size: 180466, hash: '378d298aff1899e6910d3432ccb6d58c4213589907af97dc13c1918eecd6b9cd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6NAANYBT.css': {size: 11680, hash: '3pZljaKCuWo', text: () => import('./assets-chunks/styles-6NAANYBT_css.mjs').then(m => m.default)}
  },
};
