const devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI;

export function getDevicePixelRatio () {
  return Math.ceil(devicePixelRatio) || 1;
}

function getUrl (path) {
  const href = window.location.href;
  const i = href.indexOf('#');
  const base = i >= 0 ? href.slice(0, i) : href;
  return `${base}#${path}`;
}

export function pushHash (path) {
  window.location.hash = path;
}

export function replaceHash (path) {
  window.location.replace(getUrl(path));
}
