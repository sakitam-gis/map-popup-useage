import 'element-ui/lib/theme-chalk/index.css';
import 'maptalks/dist/maptalks.css';
import './index.css';

import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App';
import store from './store';

Vue.use(ElementUI);

let instance = null;

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('props from main framework', props);
  instance = new Vue({
    el: '#vueRoot',
    store,
    render: h => h(App),
  });
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}

mount();
