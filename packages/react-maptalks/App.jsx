import 'antd/es/calendar/style/css';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react';

import ReactDOM from 'react-dom';

import Calendar from 'antd/es/calendar';

import { Map, TileLayer, ui } from 'maptalks';

import { getDevicePixelRatio } from 'main/utils';

export default function App() {
  let map = null;
  const mapRef = useRef(null);

  const [inited, setInit] = useState(false);

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  useEffect(() => {
    if (inited) {
    } else {
      map = new Map(mapRef.current, {
        center: [105.08052356963802, 36.04231948670001],
        zoom: 5,
        minZoom:1,
        maxZoom:19,
        centerCross: true,
        baseLayer: new TileLayer('tile', {
          urlTemplate: `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}${getDevicePixelRatio() > 1.5 ? '@2x' : ''}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejh2N21nMzAxMmQzMnA5emRyN2lucW0ifQ.jSE-g2vsn48Ry928pqylcg`
        }),
        // devicePixelRatio: 2
      });

      const coordinate = map.getCenter().toFixed(3);
      const content = document.createElement('div');
      content.className = 'own-popup';
      ReactDOM.render(<Calendar fullscreen={false} onPanelChange={onPanelChange} />, content);

      const options = {
        single: false,
        width: 300,
        height: 'auto',
        custom: true,
        dx: -3,
        dy: -12,
        content
      };
      const infoWindow = new ui.InfoWindow(options);
      infoWindow.addTo(map).show(coordinate);

      setInit(true);
    }

    return () => {
      if (map) {
        map.remove();
      }
    }
  }, []);

  return (<div
    className="map-wrap"
    ref={mapRef}
    style={{
      position: 'relative'
    }}>
  </div>);
}
