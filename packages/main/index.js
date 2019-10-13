/**
 * @author Kuitos
 * @since 2019-05-16
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import Vue from 'vue';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from '../../dist/index.esm';
import Framework from './Framework';
// import Framework from './Framework.vue';

// let app = null;

function render({ appContent, loading }) {

  /*
  qiankun/examples for vue
   */
  // if (!app) {
  //   app = new Vue({
  //     el: '#container',
  //     data() {
  //       return {
  //         content: appContent,
  //         loading,
  //       };
  //     },
  //     render(h) {
  //       return h(Framework, {
  //         props: {
  //           content: this.content,
  //           loading: this.loading,
  //         },
  //       });
  //     },
  //   });
  // } else {
  //   app.content = appContent;
  //   app.loading = loading;
  // }

  const container = document.getElementById('container');
  ReactDOM.render(<Framework loading={loading} content={appContent}/>, container);
}

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

render({ loading: true });

registerMicroApps(
  [
    {
      name: 'react app',
      entry: {
        scripts: [
          'qiankun/examples/react16/dist/react16.e31bb0bc.js'
        ],
        styles: [
          'qiankun/examples/react16/dist/react16.e31bb0bc.css'
        ],
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
<link rel="stylesheet" href="qiankun/examples/react16/dist/react16.e31bb0bc.css"></head>
<body>

<div id="reactRoot"></div>
<script src="qiankun/examples/react16/dist/react16.e31bb0bc.js"></script>
</body>
</html>
`,
      },
      render,
      activeRule: genActiveRule('/react')
    },
    {
      name: 'react15 app',
      entry: {
        scripts: [
          'qiankun/examples/react15/dist/react15.e31bb0bc.js'
        ],
        styles: [
          'qiankun/examples/react15/dist/react15.e31bb0bc.css'
        ],
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
<link rel="stylesheet" href="react15.e31bb0bc.css"></head>
<body>

<div id="react15Root"></div>
<script src="react15.e31bb0bc.js"></script>
</body>
</html>
`,
      },
      render,
      activeRule: genActiveRule('/15react15')
    },
    {
      name: 'vue app',
      entry: {
        scripts: [
          'qiankun/examples/vue/dist/vue.e31bb0bc.js'
        ],
        styles: [
          'qiankun/examples/vue/dist/vue.e31bb0bc.css'
        ],
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>vue app</title>
<link rel="stylesheet" href="qiankun/examples/vue/dist/vue.e31bb0bc.css"></head>
<body>

<div id="vueRoot"></div>
<script src="qiankun/examples/vue/dist/vue.e31bb0bc.js"></script>
</body>
</html>
`,
      },
      render,
      activeRule: genActiveRule('/vue')
    },
  ],
  {
    beforeLoad: [app => {
      console.log('before load', app);
    }],
    beforeMount: [app => {
      console.log('before mount', app);
    }],
    afterUnmount: [app => {
      console.log('after unload', app);
    }],
  },
);

setDefaultMountApp('/react');
runAfterFirstMounted(() => console.info('first app mounted'));

start();
