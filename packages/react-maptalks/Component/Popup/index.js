import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from '../../redux/store';

export function getPopupContent (Component, className, props = {}) {
  const content = document.createElement('div');
  content.className = className || 'own-popup';
  ReactDOM.render(<Provider store={store}>
    <Component {...props} />
  </Provider>, content);
  return content;
}
