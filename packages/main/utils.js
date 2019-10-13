const devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI;

export function getDevicePixelRatio () {
  return Math.ceil(devicePixelRatio) || 1;
}
