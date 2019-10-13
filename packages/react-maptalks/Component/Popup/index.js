import ReactDOM from 'react-dom';
import React from 'react';

export function getPopupContent (Component, className, props = {}) {
  const content = document.createElement('div');
  content.className = className || 'own-popup';
  ReactDOM.render(<Component {...props} />, content);
  return content;
}
