import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
import Framework from './Framework';
import {
  code_react_html,
  code_react_scripts,
  code_react_styles,
  code_vue_html,
  code_vue_scripts,
  code_vue_styles
} from './tempString';

const mode = 'hash' || 'history';

function getHash (location) {
  location = location || window.location;
  let href = location.href;
  const index = href.indexOf('#');
  if (index < 0) return '';

  href = href.slice(index + 1);
  const searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    const hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex)
    } else href = decodeURI(href)
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
    }
  }

  return href;
}

// let app = null;

function render({ appContent, loading }) {
  const container = document.getElementById('container');
  ReactDOM.render(<Framework loading={loading} content={appContent} mode={mode} />, container);
}

function genActiveRule(routerPrefix) {
  if (mode === 'history') {
    return location => location.pathname.startsWith(routerPrefix);
  }

  if (mode === 'hash') {
    return (location) => getHash(location) === routerPrefix;
  }
}

render({ loading: true });

const baseUrl = '';

registerMicroApps(
  [
    {
      name: 'react app',
      entry: process.env.NODE_ENV === 'development' ? '//localhost:7100' : (process.env.NODE_ENV === 'production' ? {
        html: code_react_html,
        scripts: code_react_scripts,
        styles: code_react_styles,
      } : ''),
      render,
      activeRule: genActiveRule(`${baseUrl}/react`)
    },
    {
      name: 'vue app',
      entry: process.env.NODE_ENV === 'development' ? '//localhost:7101' : (process.env.NODE_ENV === 'production' ? {
        html: code_vue_html,
        scripts: code_vue_scripts,
        styles: code_vue_styles,
      } : ''),
      render,
      activeRule: genActiveRule(`${baseUrl}/vue`)
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

setDefaultMountApp(`${baseUrl + mode === 'hash' ? '#' : ''}/react`);
runAfterFirstMounted(() => console.info('first app mounted'));

start();
