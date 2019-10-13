import 'antd/es/date-picker/style/css';
import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

import DatePicker from 'antd/es/date-picker';
import moment from 'moment';

import { Map, TileLayer, ui } from 'maptalks';

import { getDevicePixelRatio } from 'main/utils';
import MapCalendar from './Component/Popup/src/Calendar';
import { getPopupContent } from './Component/Popup';

export default function App() {
  let map = null;
  const mapRef = useRef(null);

  const dateFormat = 'YYYY-MM-DD';

  const [inited, setInit] = useState(false);

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
      const options = {
        single: false,
        width: 300,
        height: 'auto',
        custom: true,
        dx: -3,
        dy: -12,
        content: getPopupContent(MapCalendar, 'own-popup', {
          fullscreen: false,
        })
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

  return (<div className="app">
    <div
      className="map-wrap"
      ref={mapRef}
      style={{
        position: 'relative'
      }}>
    </div>

    <DatePicker
      className="map-data-picker"
      defaultValue={moment('2015-01-01', dateFormat)}
      format={dateFormat} />
  </div>);
}
