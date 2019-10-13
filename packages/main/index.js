import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
import Framework from './Framework';

// let app = null;

function render({ appContent, loading }) {
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
//       entry: {
//         scripts: [
//           'qiankun/examples/react16/dist/react16.e31bb0bc.js'
//         ],
//         styles: [
//           'qiankun/examples/react16/dist/react16.e31bb0bc.css'
//         ],
//         html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Title</title>
// <link rel="stylesheet" href="qiankun/examples/react16/dist/react16.e31bb0bc.css"></head>
// <body>
//
// <div id="reactRoot"></div>
// <script src="qiankun/examples/react16/dist/react16.e31bb0bc.js"></script>
// </body>
// </html>
// `,
//       },
      entry: '//localhost:7100',
      render,
      activeRule: genActiveRule('/react')
    },
    {
      name: 'vue app',
      entry: '//localhost:7101',
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

// setDefaultMountApp('/react');
runAfterFirstMounted(() => console.info('first app mounted'));

start();
