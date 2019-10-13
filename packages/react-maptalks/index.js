import 'antd/dist/antd.min.css';
import 'maptalks/dist/maptalks.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import { store } from './redux/store';
import './index.css';

export async function bootstrap() {
  console.log('react app bootstraped');
}

export async function mount(props) {
  console.log('props from main framework', props);
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('reactRoot'));
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('reactRoot'));
}

mount();

